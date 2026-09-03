# -*- coding: utf-8 -*-
"""
BioGen AI — Colab GPU Backend (v5)
==================================
Self-contained backend for Google Colab that runs the full de-novo protein
design pipeline behind a public ngrok URL, driven by the BioGen web app:

    Stage 1/3  RFdiffusion  -> de novo backbone generation
    Stage 2/3  ProteinMPNN  -> amino-acid sequence design
    Stage 3/3  AlphaFold2   -> structure prediction / validation

Usage (in a Colab GPU notebook):
    1. Runtime -> Change runtime type -> GPU (T4)
    2. Upload this file to /content
    3. Run:  !python biogen_colab_backend_v5.py
       (or set tokens in the launcher notebook BioGen_Colab_Backend_v5.ipynb)
    4. Copy the printed Public URL into the BioGen app Settings (Backend URL)
       and paste the API key. Test Connection, then Save & Connect.

Environment variables:
    NGROK_AUTHTOKEN   ngrok auth token (required for a public URL)
    BIOGEN_API_KEY    key clients must send as the `x-api-key` header
                      (default: biogen-key-2026)

Notes:
    - First run installs RFdiffusion + ColabDesign + model weights (~3-5 min).
      The API server starts immediately; /api/v1/health reports setup status
      and job submission is rejected with HTTP 503 until installation finishes.
    - Interrupt the notebook cell (or kernel) to stop the server; the ngrok
      tunnel dies with the process.
"""
import os
import sys
import time
import uuid
import glob
import enum
import zipfile
import re
import random
import threading
import subprocess
import urllib.request
from typing import Optional, List, Dict, Any

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
PORT = 8000
VERSION = "2.0.0"
# Rotate/replace freely, or set NGROK_AUTHTOKEN / BIOGEN_API_KEY env vars in Colab.
# NOTE: `or` fallbacks — an env var set to an empty string must NOT disable the default.
NGROK_AUTHTOKEN = (os.environ.get("NGROK_AUTHTOKEN") or "").strip() or \
    "3ITzSATFlrtGFm9l2nzYcLyDatf_3qhwnX7Xf8vGLLEzcsAbz"
API_KEY = (os.environ.get("BIOGEN_API_KEY") or "").strip() or "biogen-key-2026"

# Server dependencies only (RFdiffusion deps install later, in the background).
os.system("pip install -q fastapi uvicorn pyngrok nest_asyncio pydantic python-multipart")

from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends, Query, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, FileResponse
from pydantic import BaseModel, Field, field_validator
import uvicorn

# ---------------------------------------------------------------------------
# API schemas (mirror the BioGen web app contract)
# ---------------------------------------------------------------------------
class JobStatus(str, enum.Enum):
    QUEUED = "queued"
    PREPARING = "preparing"
    RUNNING = "running"
    PACKAGING = "packaging"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class RFdiffusionParams(BaseModel):
    name: str = Field(default="biogen_design", description="Design job name identifier")
    contigs: str = Field(default="100", description="RFdiffusion contig definition syntax")
    pdb: Optional[str] = Field(default="", description="PDB code, local path, or AlphaFold ID")
    pdb_content: Optional[str] = Field(default="", description="Full PDB text for uploaded target structures")
    iterations: int = Field(default=50, ge=10, le=500, description="Diffusion steps (T)")
    hotspot: Optional[str] = Field(default="", description="Target hotspot residues (e.g. E64,E88,E96)")
    num_designs: int = Field(default=1, ge=1, le=32, description="Number of backbones to generate")
    symmetry: str = Field(default="none", description="Symmetry constraint: none|auto|cyclic|dihedral")
    order: int = Field(default=1, ge=1, le=12, description="Symmetry order (e.g. 2 for C2/D2)")
    chains: Optional[str] = Field(default="", description="Filtered chains from input PDB (e.g. 'A,B')")
    add_potential: bool = Field(default=False, description="Guiding potentials to discourage inter-chain clashes")
    visual: str = Field(default="none", description="Unused in server mode")

    # ProteinMPNN + AlphaFold stages (defaults follow the reference notebook)
    num_seqs: int = Field(default=8, ge=1, le=64, description="Sequences to design per run (ProteinMPNN)")
    mpnn_sampling_temp: float = Field(default=0.1, description="ProteinMPNN sampling temperature")
    num_recycles: int = Field(default=3, ge=0, le=12, description="AlphaFold recycles")
    rm_aa: str = Field(default="C", description="Amino acids to exclude, e.g. 'C'")
    initial_guess: bool = Field(default=True, description="AlphaFold initial guess from backbone")
    use_multimer: bool = Field(default=False, description="Use AlphaFold-Multimer")

    @field_validator("name")
    def validate_name(cls, v: str) -> str:
        clean = re.sub(r"[^a-zA-Z0-9_\-]", "_", v.strip())
        return clean or "rf_design"

    @field_validator("hotspot")
    def validate_hotspot(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return ""
        return v.replace(" ", "").replace("'", "").replace('"', "")


class BackendHealth(BaseModel):
    status: str = "offline"
    gpu_name: Optional[str] = "N/A"
    gpu_memory_total_mb: Optional[float] = 0.0
    gpu_memory_free_mb: Optional[float] = 0.0
    cuda_available: bool = False
    gpu_available: bool = False
    rfdiffusion_ready: bool = False
    models_ready: bool = False
    version: str = VERSION
    active_jobs: int = 0
    message: Optional[str] = ""


class JobStatusResponse(BaseModel):
    job_id: str
    name: str
    status: JobStatus
    progress_pct: float = 0.0
    current_design: int = 0
    total_designs: int = 1
    current_step: int = 0
    total_steps: int = 50
    status_message: str = "Queued"
    error_message: Optional[str] = None
    created_at: float
    updated_at: float
    runtime_seconds: float = 0.0
    output_files: List[str] = []
    generated_pdb_urls: List[str] = []
    has_results_zip: bool = False
    recent_logs: List[str] = []


class StructureInfo(BaseModel):
    pdb_id: str
    title: Optional[str] = ""
    organism: Optional[str] = ""
    chains: List[str] = []
    num_residues: int = 0
    source: str = "RCSB"
    local_path: Optional[str] = None
    pdb_content: Optional[str] = None


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------
JOBS: Dict[str, JobStatusResponse] = {}
RESULTS: Dict[str, Dict[str, str]] = {}   # job_id -> {filename: absolute path}
ZIPS: Dict[str, str] = {}                 # job_id -> absolute zip path

SETUP_STATE = {"done": False, "error": None, "step": "waiting to start"}


def job_log(job: JobStatusResponse, msg: str) -> None:
    stamp = time.strftime("%H:%M:%S")
    job.recent_logs = (job.recent_logs + [f"[{stamp}] {msg}"])[-10:]
    print(f"[job {job.job_id[:8]}] {msg}", flush=True)


class PipelineCancelled(Exception):
    pass


# ---------------------------------------------------------------------------
# One-time RFdiffusion / ColabDesign installation (background thread)
# ---------------------------------------------------------------------------
def setup_rfdiffusion() -> None:
    try:
        if not os.path.isdir("params"):
            SETUP_STATE["step"] = "downloading model weights (~3 min)"
            print("[setup] downloading RFdiffusion + AlphaFold weights in background...", flush=True)
            os.system("apt-get install aria2 > /dev/null 2>&1")
            os.system("mkdir params")
            # Download in the background exactly like the reference notebook
            os.system("(\
            aria2c -q -x 16 https://files.ipd.uw.edu/krypton/schedules.zip; \
            aria2c -q -x 16 http://files.ipd.uw.edu/pub/RFdiffusion/6f5902ac237024bdd0c176cb93063dc4/Base_ckpt.pt; \
            aria2c -q -x 16 http://files.ipd.uw.edu/pub/RFdiffusion/e29311f6f1bf1af907f9ef9f44b8328b/Complex_base_ckpt.pt; \
            aria2c -q -x 16 https://storage.googleapis.com/alphafold/alphafold_params_2022-12-06.tar; \
            tar -xf alphafold_params_2022-12-06.tar -C params; \
            touch params/done.txt) &")

        if not os.path.isdir("RFdiffusion"):
            SETUP_STATE["step"] = "installing RFdiffusion"
            print("[setup] installing RFdiffusion...", flush=True)
            os.system("git clone https://github.com/sokrypton/RFdiffusion.git")
            os.system("pip install -q jedi omegaconf hydra-core icecream pyrsistent pynvml decorator")
            os.system("pip install -q git+https://github.com/NVIDIA/dllogger#egg=dllogger")
            # --no-dependencies avoids installing nvidia-cuda-* over Colab's torch
            os.system("pip install -q --no-dependencies dgl -f https://data.dgl.ai/wheels/torch-2.4/cu124/repo.html")
            os.system("pip install -q --no-dependencies e3nn==0.5.5 opt_einsum_fx")
            os.system("cd RFdiffusion/env/SE3Transformer; pip install -q .")
            os.system("wget -qnc https://files.ipd.uw.edu/krypton/ananas")
            os.system("chmod +x ananas")

        if not os.path.isdir("colabdesign"):
            SETUP_STATE["step"] = "installing ColabDesign (ProteinMPNN + AlphaFold)"
            print("[setup] installing ColabDesign...", flush=True)
            os.system("pip -q install git+https://github.com/sokrypton/ColabDesign.git@v1.1.1")
            os.system("ln -s /usr/local/lib/python3.*/dist-packages/colabdesign colabdesign")

        if not os.path.isdir("RFdiffusion/models"):
            SETUP_STATE["step"] = "waiting for model weights"
            print("[setup] moving model weights into place...", flush=True)
            os.system("mkdir RFdiffusion/models")
            models = ["Base_ckpt.pt", "Complex_base_ckpt.pt"]
            for m in models:
                while os.path.isfile(f"{m}.aria2"):
                    time.sleep(5)
            os.system(f"mv {' '.join(models)} RFdiffusion/models")
            os.system("unzip -oq schedules.zip; rm -f schedules.zip")

        if "RFdiffusion" not in sys.path:
            os.environ["DGLBACKEND"] = "pytorch"
            sys.path.append("RFdiffusion")

        SETUP_STATE["done"] = True
        SETUP_STATE["step"] = "ready"
        print("[setup] RFdiffusion is ready — job submission is now open.", flush=True)
    except Exception as e:
        SETUP_STATE["error"] = str(e)
        print(f"[setup] FAILED: {e}", flush=True)


def _import_design_deps():
    if "RFdiffusion" not in sys.path:
        os.environ["DGLBACKEND"] = "pytorch"
        sys.path.append("RFdiffusion")
    from inference.utils import parse_pdb
    from colabdesign.rf.utils import fix_contigs, fix_partial_contigs, fix_pdb, sym_it
    from colabdesign.shared.protein import pdb_to_string
    return parse_pdb, fix_contigs, fix_partial_contigs, fix_pdb, sym_it, pdb_to_string


def gpu_info():
    try:
        import torch
        if torch.cuda.is_available():
            props = torch.cuda.get_device_properties(0)
            total_mb = props.total_memory / 1024 / 1024
            free_mb = total_mb
            try:
                import pynvml
                pynvml.nvmlInit()
                handle = pynvml.nvmlDeviceGetHandleByIndex(0)
                mem = pynvml.nvmlDeviceGetMemoryInfo(handle)
                free_mb = mem.free / 1024 / 1024
            except Exception:
                pass
            return props.name, round(total_mb, 1), round(free_mb, 1)
    except Exception:
        pass
    return None, 0.0, 0.0


# ---------------------------------------------------------------------------
# Pipeline helpers (adapted from the reference RFdiffusion notebook)
# ---------------------------------------------------------------------------
def get_pdb(pdb_code: str) -> str:
    """Resolve a PDB code / UniProt accession to a local PDB file."""
    if not pdb_code:
        raise ValueError("No target PDB provided (pass `pdb` or `pdb_content`)")
    if os.path.isfile(pdb_code):
        return pdb_code
    if len(pdb_code) == 4:
        if not os.path.isfile(f"{pdb_code}.pdb1"):
            os.system(f"wget -qnc https://files.rcsb.org/download/{pdb_code}.pdb1.gz")
            os.system(f"gunzip {pdb_code}.pdb1.gz")
        return f"{pdb_code}.pdb1"
    os.system(f"wget -qnc https://alphafold.ebi.ac.uk/files/AF-{pdb_code}-F1-model_v3.pdb")
    return f"AF-{pdb_code}-F1-model_v3.pdb"


def resolve_target(params: RFdiffusionParams, full_path: str) -> Optional[str]:
    """Target structure: uploaded PDB text wins, else PDB code, else None."""
    if params.pdb_content and params.pdb_content.strip():
        os.makedirs(full_path, exist_ok=True)
        target = f"{full_path}/target.pdb"
        with open(target, "w") as handle:
            handle.write(params.pdb_content)
        return target
    if params.pdb:
        return get_pdb(params.pdb)
    return None


def run_ananas(pdb_str: str, path: str, sym=None):
    """Automatic symmetry detection (AnAnaS) — from the reference notebook."""
    import numpy as np
    pdb_filename = f"outputs/{path}/ananas_input.pdb"
    out_filename = f"outputs/{path}/ananas.json"
    with open(pdb_filename, "w") as handle:
        handle.write(pdb_str)

    cmd = f"./ananas {pdb_filename} -u -j {out_filename}"
    if sym is None:
        os.system(cmd)
    else:
        os.system(f"{cmd} {sym}")

    try:
        out = json.loads(open(out_filename, "r").read())
        results, AU = out[0], out[-1]["AU"]
        group = AU["group"]
        chains = AU["chain names"]

        C = np.array(results["transforms"][0]["CENTER"])
        A = [np.array(t["AXIS"]) for t in results["transforms"]]

        new_lines = []
        for line in pdb_str.split("\n"):
            if line.startswith("ATOM"):
                chain = line[21:22]
                if chain in chains:
                    x = np.array([float(line[i:(i + 8)]) for i in [30, 38, 46]])
                    if group[0] == "c":
                        x = sym_it(x, C, A[0])
                    if group[0] == "d":
                        x = sym_it(x, C, A[1], A[0])
                    coord_str = "".join(["{:8.3f}".format(a) for a in x])
                    new_lines.append(line[:30] + coord_str + line[54:])
            else:
                new_lines.append(line)
        return results, "\n".join(new_lines)
    except Exception:
        return None, pdb_str


def _alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def _tail(path: str, lines: int = 12) -> str:
    try:
        with open(path, "r", errors="replace") as handle:
            return "".join(handle.readlines()[-lines:])[-800:]
    except Exception:
        return "(no log available)"


def _run_monitored(job: JobStatusResponse, command: str, steps: int, num_designs: int) -> None:
    """Run the RFdiffusion CLI and track per-step progress via /dev/shm PDBs."""
    log_path = "/dev/shm/rfdiffusion.log"
    pid_file = "/dev/shm/pid"
    os.system(f'nohup {command} > {log_path} 2>&1 & echo $! > {pid_file}')
    pid = int(open(pid_file).read().strip())
    os.remove(pid_file)

    total = steps * num_designs
    done = 0
    for design in range(num_designs):
        for n in range(steps):
            if job.status == JobStatus.CANCELLED:
                os.system(f"pkill -9 -P {pid}; kill -9 {pid}")
                raise PipelineCancelled()
            wait = True
            while wait:
                time.sleep(0.2)
                if os.path.isfile(f"/dev/shm/{n}.pdb"):
                    pdb_str = open(f"/dev/shm/{n}.pdb").read()
                    if pdb_str[-3:] == "TER":
                        wait = False
                    elif not _alive(pid):
                        raise RuntimeError(
                            f"RFdiffusion exited early at step {n}:\n{_tail(log_path)}"
                        )
                elif not _alive(pid):
                    raise RuntimeError(
                        f"RFdiffusion exited early at step {n}:\n{_tail(log_path)}"
                    )
            if os.path.exists(f"/dev/shm/{n}.pdb"):
                os.remove(f"/dev/shm/{n}.pdb")
            done += 1
            job.progress_pct = round(5.0 + 55.0 * done / total, 1)
            job.current_step = n + 1
            job.current_design = design + 1
            job.total_steps = steps
            job.status_message = (
                f"Stage 1/3 RFdiffusion: design {design + 1}/{num_designs}, "
                f"diffusion step {n + 1}/{steps}"
            )
            job.updated_at = time.time()
    while _alive(pid):
        if job.status == JobStatus.CANCELLED:
            os.system(f"pkill -9 -P {pid}; kill -9 {pid}")
            raise PipelineCancelled()
        time.sleep(0.2)


def run_diffusion(job: JobStatusResponse, params: RFdiffusionParams, path: str):
    """Stage 1/3 — RFdiffusion backbone generation. Returns (contigs, copies)."""
    parse_pdb, fix_contigs, fix_partial_contigs, fix_pdb, sym_it, pdb_to_string = _import_design_deps()

    full_path = f"outputs/{path}"
    os.makedirs(full_path, exist_ok=True)
    opts = [f"inference.output_prefix={full_path}",
            f"inference.num_designs={params.num_designs}"]

    chains = params.chains or None

    # symmetry setup
    symmetry = params.symmetry
    if symmetry in ["auto", "cyclic", "dihedral"]:
        if symmetry == "auto":
            sym, copies = None, 1
        else:
            sym, copies = {"cyclic": (f"c{params.order}", params.order),
                           "dihedral": (f"d{params.order}", params.order * 2)}[symmetry]
    else:
        symmetry = None
        sym, copies = None, 1

    # mode detection (free / fixed / partial)
    contigs = params.contigs.replace(",", " ").replace(":", " ").split()
    is_fixed, is_free = False, False
    fixed_chains = []
    for contig in contigs:
        for x in contig.split("/"):
            a = x.split("-")[0]
            if a and a[0].isalpha():
                is_fixed = True
                if a[0] not in fixed_chains:
                    fixed_chains.append(a[0])
            if a.isnumeric():
                is_free = True
    if len(contigs) == 0 or not is_free:
        mode = "partial"
    elif is_fixed:
        mode = "fixed"
    else:
        mode = "free"

    # prepare input PDB for fixed/partial modes
    if mode in ["partial", "fixed"]:
        target = resolve_target(params, full_path)
        if target is None:
            raise ValueError(f"'{mode}' mode requires a target structure (load one in the app)")
        pdb_str = pdb_to_string(target, chains=chains)
        if symmetry == "auto":
            a, pdb_str = run_ananas(pdb_str, path)
            if a is None:
                job_log(job, "ERROR: no symmetry detected — continuing without symmetry")
                symmetry = None
                sym, copies = None, 1
            else:
                if a["group"][0] == "c":
                    symmetry = "cyclic"
                    sym, copies = a["group"], int(a["group"][1:])
                elif a["group"][0] == "d":
                    symmetry = "dihedral"
                    sym, copies = a["group"], 2 * int(a["group"][1:])
                else:
                    job_log(job, f"ERROR: unsupported symmetry ({a['group']}) — continuing without")
                    symmetry = None
                    sym, copies = None, 1
        elif mode == "fixed":
            pdb_str = pdb_to_string(pdb_str, chains=fixed_chains)

        pdb_filename = f"{full_path}/input.pdb"
        with open(pdb_filename, "w") as handle:
            handle.write(pdb_str)

        parsed_pdb = parse_pdb(pdb_filename)
        opts.append(f"inference.input_pdb={pdb_filename}")
        if mode == "partial":
            iterations = int(80 * (params.iterations / 200))
            opts.append(f"diffuser.partial_T={iterations}")
            contigs = fix_partial_contigs(contigs, parsed_pdb)
        else:
            iterations = params.iterations
            opts.append(f"diffuser.T={iterations}")
            contigs = fix_contigs(contigs, parsed_pdb)
    else:
        iterations = params.iterations
        opts.append(f"diffuser.T={iterations}")
        contigs = fix_contigs(contigs, None)

    if params.hotspot:
        opts.append(f"ppi.hotspot_res=[{params.hotspot}]")

    if sym is not None:
        sym_opts = ["--config-name symmetry", f"inference.symmetry={sym}"]
        if params.add_potential:
            sym_opts += ["'potentials.guiding_potentials=[\"type:olig_contacts,weight_intra:1,weight_inter:0.1\"]'",
                         "potentials.olig_intra_all=True", "potentials.olig_inter_all=True",
                         "potentials.guide_scale=2", "potentials.guide_decay=quadratic"]
        opts = sym_opts + opts
        contigs = sum([contigs] * copies, [])

    opts.append(f"'contigmap.contigs=[{' '.join(contigs)}]'")
    opts += ["inference.dump_pdb=True", "inference.dump_pdb_path='/dev/shm'"]

    cmd = f"./RFdiffusion/run_inference.py {' '.join(opts)}"
    job_log(job, f"RFdiffusion mode={mode}, {params.num_designs} design(s), T={iterations}")
    job_log(job, f"contigs: {' '.join(contigs)}")

    _run_monitored(job, cmd, iterations, params.num_designs)

    # fix PDB chain/contig naming (from the reference notebook)
    for n in range(params.num_designs):
        pdbs = [f"outputs/traj/{path}_{n}_pX0_traj.pdb",
                f"outputs/traj/{path}_{n}_Xt-1_traj.pdb",
                f"{full_path}_{n}.pdb"]
        for pdb_file in pdbs:
            if os.path.isfile(pdb_file):
                with open(pdb_file, "r") as handle:
                    pdb_str = handle.read()
                with open(pdb_file, "w") as handle:
                    handle.write(fix_pdb(pdb_str, contigs))

    return contigs, copies


def run_mpnn_af2(job: JobStatusResponse, params: RFdiffusionParams, path: str, contigs, copies: int) -> None:
    """Stages 2-3 — ProteinMPNN sequence design + AlphaFold2 validation
    via ColabDesign's designability_test.py (same invocation as the notebook)."""
    # AlphaFold params may still be downloading
    deadline = time.time() + 20 * 60
    while not os.path.isfile("params/done.txt"):
        if job.status == JobStatus.CANCELLED:
            raise PipelineCancelled()
        if time.time() > deadline:
            raise RuntimeError("Timed out waiting for AlphaFold params to download")
        job.status_message = "Waiting for AlphaFold params download..."
        time.sleep(5)

    contigs_str = ":".join(contigs)
    opts = [f"--pdb=outputs/{path}_0.pdb",
            f"--loc=outputs/{path}",
            f"--contig={contigs_str}",
            f"--copies={copies}",
            f"--num_seqs={params.num_seqs}",
            f"--num_recycles={params.num_recycles}",
            f"--rm_aa={params.rm_aa}",
            f"--mpnn_sampling_temp={params.mpnn_sampling_temp}",
            f"--num_designs={params.num_designs}"]
    if params.initial_guess:
        opts.append("--initial_guess")
    if params.use_multimer:
        opts.append("--use_multimer")
    opts = " ".join(opts)

    cmd = f"python colabdesign/rf/designability_test.py {opts}"
    job_log(job, "Stage 2/3 ProteinMPNN: designing amino-acid sequences...")
    job.status_message = f"Stage 2/3 ProteinMPNN: sequence design ({params.num_seqs} seqs)..."
    job.progress_pct = 62.0
    job.updated_at = time.time()

    log_path = "/dev/shm/mpnn_af2.log"
    with open(log_path, "w") as log_handle:
        proc = subprocess.Popen(cmd, shell=True, stdout=log_handle, stderr=subprocess.STDOUT)

    stage3_started = False
    pct = 62.0
    while proc.poll() is None:
        if job.status == JobStatus.CANCELLED:
            proc.kill()
            raise PipelineCancelled()
        time.sleep(3)
        # MPNN finishes early and writes sequences before AlphaFold starts
        if not stage3_started and glob.glob(f"outputs/{path}/*.fasta"):
            stage3_started = True
            job_log(job, "Stage 3/3 AlphaFold2: predicting + validating structures...")
            job.status_message = f"Stage 3/3 AlphaFold2: structure prediction ({params.num_recycles} recycles)..."
        pct = min(97.0, pct + 0.5)
        job.progress_pct = round(pct, 1)
        job.updated_at = time.time()

    if proc.returncode != 0:
        raise RuntimeError(f"ProteinMPNN/AlphaFold stage failed:\n{_tail(log_path)}")
    if not stage3_started:
        job_log(job, "Stage 3/3 AlphaFold2 validation finished")
    job.progress_pct = 97.0


def collect_results(job: JobStatusResponse, params: RFdiffusionParams, path: str) -> None:
    """Register pipeline outputs and build the results zip."""
    results: Dict[str, str] = {}
    pdb_order: List[str] = []

    def add(filename: str, src: str, is_pdb: bool) -> None:
        if os.path.isfile(src):
            results[filename] = os.path.abspath(src)
            if is_pdb:
                pdb_order.append(filename)

    # AlphaFold-validated structures first (final results)
    for f in sorted(glob.glob(f"outputs/{path}/*.pdb")):
        add(os.path.basename(f), f, is_pdb=True)
    # then raw RFdiffusion backbones
    for n in range(params.num_designs):
        add(f"backbone_{n}.pdb", f"outputs/{path}_{n}.pdb", is_pdb=True)
    # sequences / metrics are downloadable too, but not listed as 3D candidates
    for f in sorted(glob.glob(f"outputs/{path}/*")):
        if os.path.splitext(f)[1].lower() in (".fasta", ".csv", ".json"):
            add(os.path.basename(f), f, is_pdb=False)

    if not pdb_order:
        raise RuntimeError("Pipeline produced no PDB outputs — check the Colab cell logs")

    RESULTS[job.job_id] = results
    job.output_files = pdb_order
    job.generated_pdb_urls = [f"/api/v1/jobs/{job.job_id}/results/{f}" for f in pdb_order]

    zip_path = f"{path}.result.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in results.values():
            zf.write(f, arcname=os.path.join("results", os.path.basename(f)))
    ZIPS[job.job_id] = os.path.abspath(zip_path)
    job.has_results_zip = True

    fasta = [f for f in results if f.endswith(".fasta")]
    if fasta:
        job_log(job, f"Designed sequences available: {', '.join(fasta)}")


def run_pipeline(job_id: str, params: RFdiffusionParams) -> None:
    job = JOBS.get(job_id)
    if job is None:
        return
    try:
        if job.status == JobStatus.CANCELLED:
            return
        job.status = JobStatus.RUNNING
        job.status_message = "Preparing..."
        job_log(job, f"Job started: {params.name} | contigs='{params.contigs}' | "
                     f"designs={params.num_designs} | T={params.iterations}")

        # unique output prefix per job
        path = params.name
        counter = 1
        while os.path.exists(f"outputs/{path}_0.pdb"):
            path = f"{params.name}_{counter}"
            counter += 1
        if path != params.name:
            job_log(job, f"Name collision — outputs stored as '{path}'")

        # Stage 1/3: backbone
        job.status_message = "Stage 1/3 RFdiffusion: backbone generation..."
        job.progress_pct = 5.0
        contigs, copies = run_diffusion(job, params, path)
        job_log(job, f"Stage 1/3 complete: {params.num_designs} backbone(s) generated")

        # Stages 2-3: sequence + structure
        run_mpnn_af2(job, params, path, contigs, copies)

        # package
        job.status = JobStatus.PACKAGING
        job.status_message = "Packaging results..."
        job.updated_at = time.time()
        collect_results(job, params, path)
        job_log(job, f"Pipeline finished: {len(job.output_files)} structure file(s) ready")

        job.status = JobStatus.COMPLETED
        job.progress_pct = 100.0
        job.current_design = params.num_designs
        job.status_message = "Completed"
        job.updated_at = time.time()
    except PipelineCancelled:
        job.status = JobStatus.CANCELLED
        job.status_message = "Cancelled by user"
        job_log(job, "Job cancelled")
    except Exception as e:
        job.status = JobStatus.FAILED
        job.status_message = "Failed"
        job.error_message = str(e)[:800]
        job_log(job, f"ERROR: {str(e)[:200]}")
    job.updated_at = time.time()


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(title="BioGen AI Colab Backend", version=VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


def verify_key(x_api_key: str = Header(default=""), api_key: str = Query(default="")):
    """Accept the key via header (the app sends `x-api-key`) or query param."""
    if not API_KEY:
        return
    if x_api_key == API_KEY or api_key == API_KEY:
        return
    raise HTTPException(status_code=401, detail="Invalid or missing API key")


@app.get("/")
def root():
    return {"status": "ok", "message": "BioGen AI Colab Backend is running.", "version": VERSION}


@app.get("/api/v1/health", response_model=BackendHealth)
def health_check():
    gpu_name, total_mb, free_mb = gpu_info()
    ready = SETUP_STATE["done"] and SETUP_STATE["error"] is None
    if SETUP_STATE["error"]:
        message = f"Setup FAILED: {SETUP_STATE['error']}"
    elif ready:
        message = "Ready — running on Google Colab"
    else:
        message = f"Installing RFdiffusion... ({SETUP_STATE['step']})"
    return BackendHealth(
        status="ok",
        gpu_name=gpu_name or "No GPU detected",
        gpu_memory_total_mb=total_mb,
        gpu_memory_free_mb=free_mb,
        cuda_available=gpu_name is not None,
        gpu_available=gpu_name is not None,
        rfdiffusion_ready=ready,
        models_ready=ready,
        active_jobs=sum(1 for j in JOBS.values()
                        if j.status in (JobStatus.QUEUED, JobStatus.PREPARING, JobStatus.RUNNING)),
        message=message,
    )


jobs_router_dependencies = [Depends(verify_key)]


@app.post("/api/v1/jobs", status_code=201, dependencies=jobs_router_dependencies)
def submit_job(params: RFdiffusionParams, background_tasks: BackgroundTasks):
    if SETUP_STATE["error"]:
        raise HTTPException(status_code=503, detail=f"RFdiffusion setup failed: {SETUP_STATE['error']}")
    if not SETUP_STATE["done"]:
        raise HTTPException(status_code=503,
                            detail="RFdiffusion is still installing — try again in a few minutes")
    job_id = str(uuid.uuid4())
    job = JobStatusResponse(
        job_id=job_id,
        name=params.name,
        status=JobStatus.QUEUED,
        total_designs=params.num_designs,
        total_steps=params.iterations,
        status_message="Queued",
        created_at=time.time(),
        updated_at=time.time(),
    )
    JOBS[job_id] = job
    background_tasks.add_task(run_pipeline, job_id, params)
    return {"job_id": job_id, "status": "queued"}


@app.get("/api/v1/jobs", response_model=List[JobStatusResponse], dependencies=jobs_router_dependencies)
def list_jobs():
    return sorted(JOBS.values(), key=lambda j: j.created_at, reverse=True)


@app.get("/api/v1/jobs/{job_id}", response_model=JobStatusResponse, dependencies=jobs_router_dependencies)
def get_job(job_id: str):
    job = JOBS.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status in (JobStatus.QUEUED, JobStatus.PREPARING, JobStatus.RUNNING):
        job.runtime_seconds = time.time() - job.created_at
    return job


@app.post("/api/v1/jobs/{job_id}/cancel", dependencies=jobs_router_dependencies)
def cancel_job(job_id: str):
    job = JOBS.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status in (JobStatus.QUEUED, JobStatus.PREPARING, JobStatus.RUNNING):
        job.status = JobStatus.CANCELLED
        job.status_message = "Cancelled by user"
        job.updated_at = time.time()
    return {"job_id": job_id, "status": job.status.value}


@app.get("/api/v1/jobs/{job_id}/results/{filename}", dependencies=jobs_router_dependencies)
def get_result_file(job_id: str, filename: str):
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail="Job not found")
    src = RESULTS.get(job_id, {}).get(filename)
    if src is None:
        raise HTTPException(status_code=404, detail="Result file not found")
    media = "chemical/x-pdb" if filename.lower().endswith(".pdb") else "text/plain"
    return PlainTextResponse(
        open(src, "r", errors="replace").read(),
        media_type=media,
        headers={"Content-Disposition": f'inline; filename="{filename}"'},
    )


@app.get("/api/v1/jobs/{job_id}/results_zip", dependencies=jobs_router_dependencies)
def get_results_zip(job_id: str):
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail="Job not found")
    zip_path = ZIPS.get(job_id)
    if zip_path is None or not os.path.isfile(zip_path):
        raise HTTPException(status_code=404, detail="Results zip not available")
    return FileResponse(zip_path, media_type="application/zip",
                        filename=os.path.basename(zip_path))


class PDBFetchRequest(BaseModel):
    pdb_id: str


@app.post("/api/v1/pdb/fetch", response_model=StructureInfo, dependencies=jobs_router_dependencies)
def fetch_pdb(req: PDBFetchRequest):
    pdb_id = re.sub(r"[^A-Za-z0-9]", "", req.pdb_id).upper()
    if not pdb_id:
        raise HTTPException(status_code=422, detail="A PDB ID is required")
    url = f"https://files.rcsb.org/download/{pdb_id}.pdb"
    try:
        with urllib.request.urlopen(url, timeout=20) as resp:
            content = resp.read().decode("utf-8", errors="replace")
    except Exception:
        raise HTTPException(status_code=404, detail=f"PDB entry '{pdb_id}' not found on RCSB")
    chains: List[str] = []
    residues = set()
    title = ""
    for line in content.splitlines():
        if line.startswith("TITLE "):
            title += " " + line[10:].strip()
        elif title and not line.startswith("TITLE "):
            break
        if line.startswith("ATOM  ") and line[21:22].strip():
            chain = line[21]
            if chain not in chains:
                chains.append(chain)
            residues.add((chain, line[22:27]))
    return StructureInfo(pdb_id=pdb_id, title=title.strip() or f"Structure {pdb_id}",
                         chains=chains, num_residues=len(residues), source="RCSB",
                         pdb_content=content)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main():
    print("=" * 64, flush=True)
    print("  BioGen AI — Colab GPU Backend v5", flush=True)
    print("  Pipeline: RFdiffusion -> ProteinMPNN -> AlphaFold2", flush=True)
    print("=" * 64, flush=True)

    # Install RFdiffusion in the background; the API serves immediately.
    threading.Thread(target=setup_rfdiffusion, daemon=True).start()

    public_url = None
    if NGROK_AUTHTOKEN:
        try:
            from pyngrok import ngrok
            ngrok.kill()  # clear stale tunnels from previous runs
            ngrok.set_auth_token(NGROK_AUTHTOKEN)
            public_url = ngrok.connect(PORT, "http").public_url
        except Exception as e:
            print(f"[ngrok] tunnel failed: {e}", flush=True)
    else:
        print("[ngrok] NGROK_AUTHTOKEN not set — server will only be reachable inside Colab.", flush=True)

    print("", flush=True)
    print("=" * 64, flush=True)
    if public_url:
        print(f"  PUBLIC URL : {public_url}/api/v1", flush=True)
    else:
        print(f"  LOCAL URL  : http://localhost:{PORT}/api/v1", flush=True)
    print(f"  API KEY    : {API_KEY}", flush=True)
    print("", flush=True)
    print("  Paste the URL and key into the BioGen app Settings page,", flush=True)
    print("  then click Test Connection and Save & Connect.", flush=True)
    print("  The first job can start once setup finishes (~3-5 min).", flush=True)
    print("=" * 64, flush=True)
    print("", flush=True)

    uvicorn.run(app, host="0.0.0.0", port=PORT)


if __name__ == "__main__":
    try:
        import nest_asyncio
        nest_asyncio.apply()
    except Exception:
        pass
    main()
