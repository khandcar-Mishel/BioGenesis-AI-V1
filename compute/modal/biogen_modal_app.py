# -*- coding: utf-8 -*-
"""
BioGen AI - RFdiffusion backend on Modal
========================================
Serverless GPU port of `backend/biogen_colab_backend_v5.py`.

Why Modal instead of Colab:
  * Stable HTTPS URL that never changes (paste once into the app Settings).
  * Scale-to-zero: you only pay for GPU seconds a job actually uses.
  * Model weights live on a modal.Volume -> downloaded once, never again.
  * No 90-min idle disconnect, no daily GPU cooldown, no "no serving" ToS.

Pipeline (unchanged from v5): RFdiffusion -> ProteinMPNN -> AlphaFold2.
The FastAPI app + job logic are imported verbatim from v5; only the
*environment* (deps, weights, paths) is rebuilt the Modal way.

--------------------------------------------------------------------------
ONE-TIME SETUP
--------------------------------------------------------------------------
  pip install modal
  modal setup                                   # log in / create account

  # API key the frontend must send as x-api-key (matches v5 default):
  modal secret create biogen-secrets BIOGEN_API_KEY=biogen-key-2026

  # Download ~5 GB of weights into the Volume (run once, ~5-10 min):
  modal run compute/modal/biogen_modal_app.py::download_weights

  # Deploy the API:
  modal deploy compute/modal/biogen_modal_app.py

Modal prints a URL like
  https://<you>--biogen-rfdiffusion-fastapi-app.modal.run
Paste THAT into the BioGen app Settings -> Backend URL (the app appends
/api/v1 for you), set the API key, Test Connection, Save & Connect.

--------------------------------------------------------------------------
NOTES / KNOWN TUNING POINTS (first deploy may need 1-2 nudges)
--------------------------------------------------------------------------
  * RFdiffusion (torch) and ColabDesign/AlphaFold (jax) must share one
    CUDA 12.x container. torch is pinned to 2.4.1+cu124. jax[cuda12] is
    installed unpinned, in the SAME pip invocation as ColabDesign, so jax /
    jaxlib / jax-cuda12-plugin resolve to one coherent set (installing them
    separately let ColabDesign's unpinned `jax` dep upgrade jaxlib without
    upgrading the plugin -> version-mismatched pair -> segfault on
    jax.devices()). If `modal run ...::selftest` reports a jax import/API
    error, ColabDesign v1.1.1 (2023) code may be hitting a renamed jax API
    on a too-new jax; the fix is then to *ceiling*-pin jax in that one line
    (e.g. "jax[cuda12]<0.5") and redeploy.
  * Job state is in-memory in a single container (max_containers=1, same
    as v5). If the browser tab that submitted a job closes AND polling
    stops for longer than `scaledown_window`, the container may scale
    down and lose that run. Keep the tab open until the job finishes.
    (v2 would move JOBS to a modal.Dict and spawn each pipeline as its
    own function - see the bottom of this file.)
"""
import pathlib
import modal

APP_NAME = "biogen-rfdiffusion"


def _find_v5_source() -> "pathlib.Path | None":
    """Locate backend/biogen_colab_backend_v5.py relative to this file.

    Only resolvable when the Modal *client* imports this script from the
    repo checkout (deploy/run time). When a deployed container re-imports
    this same script to look up a function's metadata, this file has been
    mounted flat (e.g. /root/biogen_modal_app.py) with no repo siblings --
    that's fine, the image already has /root/biogen_backend.py baked in
    from the original deploy, so returning None here (and skipping the
    local-file layer below) is the correct, non-crashing behavior.
    """
    here = pathlib.Path(__file__).resolve()
    for parent in here.parents:
        candidate = parent / "backend" / "biogen_colab_backend_v5.py"
        if candidate.is_file():
            return candidate
    return None


V5_LOCAL = _find_v5_source()

# Layout inside the container (v5's relative paths resolve against /root):
#   /root/RFdiffusion                cloned repo (baked into image)
#   /root/colabdesign                symlink -> site-packages/colabdesign (baked)
#   /root/ananas                     symmetry binary (baked, best-effort)
#   /root/params                  -> /weights/params              (Volume)
#   /root/RFdiffusion/schedules   -> /weights/schedules           (Volume, self-populates)
#   /root/RFdiffusion/models      -> /weights/rfdiffusion_models  (Volume)
#   /root/outputs                     ephemeral run outputs
WEIGHTS = "/weights"
weights_volume = modal.Volume.from_name("biogen-rfdiffusion-weights", create_if_missing=True)

# NOTE: files.ipd.uw.edu/krypton/schedules.zip (used by the original notebook)
# 404s upstream as of Sep 2026 and isn't needed -- see the comment by the
# RFdiffusion/schedules symlink below.
BASE_CKPT_URL = "http://files.ipd.uw.edu/pub/RFdiffusion/6f5902ac237024bdd0c176cb93063dc4/Base_ckpt.pt"
COMPLEX_CKPT_URL = "http://files.ipd.uw.edu/pub/RFdiffusion/e29311f6f1bf1af907f9ef9f44b8328b/Complex_base_ckpt.pt"
AF_PARAMS_URL = "https://storage.googleapis.com/alphafold/alphafold_params_2022-12-06.tar"

# ---------------------------------------------------------------------------
# Image: CUDA 12.4 + torch 2.4 + the exact extra installs from the notebook
# ---------------------------------------------------------------------------
image = (
    modal.Image.from_registry(
        "nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04", add_python="3.11"
    )
    .apt_install("git", "wget", "aria2", "unzip", "build-essential", "ninja-build")
    .workdir("/root")
    # --- server deps (were installed at import-time in v5; done here instead) ---
    .pip_install(
        "fastapi==0.115.6", "uvicorn[standard]==0.34.0", "pydantic==2.10.4",
        "python-multipart==0.0.20", "nest_asyncio==1.6.0", "requests==2.32.3",
    )
    # --- torch 2.4 / cu124 (matches Colab's runtime the notebook targets) ---
    .pip_install(
        "torch==2.4.1", "torchvision==0.19.1",
        extra_options="--index-url https://download.pytorch.org/whl/cu124",
    )
    # --- RFdiffusion + its odd deps (mirrors setup_rfdiffusion() in v5) ---
    .run_commands(
        "git clone https://github.com/sokrypton/RFdiffusion.git /root/RFdiffusion",
        "pip install -q 'numpy<2' jedi omegaconf hydra-core icecream pyrsistent pynvml decorator scipy "
        "psutil networkx tqdm requests",  # dgl's transitive deps -- installed below with --no-dependencies
        "pip install -q git+https://github.com/NVIDIA/dllogger#egg=dllogger",
        "pip install -q --no-dependencies dgl -f https://data.dgl.ai/wheels/torch-2.4/cu124/repo.html",
        "pip install -q --no-dependencies e3nn==0.5.5 opt_einsum_fx",
        "cd /root/RFdiffusion/env/SE3Transformer && pip install -q --no-cache-dir .",
        # files.ipd.uw.edu/krypton/ananas 404s as of Sep 2026 (upstream removed it).
        # Only used for symmetry='auto' detection; v5's run_ananas() already
        # falls back to "no symmetry detected" if this binary is missing, so a
        # failed fetch here must not fail the whole image build.
        "(wget -qO /root/ananas https://files.ipd.uw.edu/krypton/ananas && chmod +x /root/ananas) "
        "|| echo 'ananas unavailable upstream -> symmetry=auto will no-op' >&2",
        # v5 invokes ./RFdiffusion/run_inference.py directly -> needs the +x bit
        "chmod +x /root/RFdiffusion/run_inference.py /root/RFdiffusion/scripts/*.py || true",
    )
    # --- ColabDesign (ProteinMPNN + AlphaFold via jax) ---
    # jax[cuda12] and ColabDesign MUST be resolved by pip in the same
    # invocation. Installing them separately (as two `pip install` calls)
    # lets ColabDesign's unpinned `jax` install_requires silently upgrade
    # jaxlib without upgrading the matching jax-cuda12-plugin package,
    # producing a version-mismatched pair that jax segfaults on at
    # jax.devices() -- resolving both together keeps jax/jaxlib/plugin coherent.
    .run_commands(
        "pip install -q 'jax[cuda12]' git+https://github.com/sokrypton/ColabDesign.git@v1.1.1",
        # v5 does: ln -s .../dist-packages/colabdesign colabdesign
        'ln -s "$(python -c \'import os,colabdesign;print(os.path.dirname(colabdesign.__file__))\')" /root/colabdesign',
    )
    .env({"DGLBACKEND": "pytorch", "PYTHONUNBUFFERED": "1"})
)

# --- bring in the v5 backend, minus its import-time pip shell-out ---
# Only meaningful (and only possible) when this script is imported from the
# repo checkout, i.e. by the local `modal` CLI at deploy/run time. A running
# container re-importing this same file to look up a function's metadata has
# it mounted flat with no repo siblings (see _find_v5_source) -- by then the
# image already has /root/biogen_backend.py baked in from the real deploy,
# so there's nothing to (re-)add and this must be a harmless no-op, not a
# crash.
if V5_LOCAL is not None:
    image = image.add_local_file(V5_LOCAL.as_posix(), "/root/biogen_backend.py", copy=True).run_commands(
        r"sed -i '/os.system(.*pip install -q fastapi uvicorn pyngrok/d' /root/biogen_backend.py"
    )

app = modal.App(APP_NAME)


def _prepare_runtime():
    """Wire the Volume weights into the paths v5's pipeline expects, then
    mark setup as already-done so job submission is open immediately."""
    import os
    import shutil
    import sys

    os.chdir("/root")
    os.makedirs(f"{WEIGHTS}/params", exist_ok=True)
    os.makedirs(f"{WEIGHTS}/schedules", exist_ok=True)
    os.makedirs(f"{WEIGHTS}/rfdiffusion_models", exist_ok=True)
    os.makedirs("/root/outputs", exist_ok=True)

    for link, target in [
        ("/root/params", f"{WEIGHTS}/params"),
        # RFdiffusion reads/writes its IGSO3 cache at RFdiffusion/schedules
        # (inference/model_runners.py: cache_dir=f"{SCRIPT_DIR}/../schedules"),
        # not ./schedules -> point the symlink there so the first-run compute
        # gets persisted on the Volume instead of being redone every cold start.
        ("/root/RFdiffusion/schedules", f"{WEIGHTS}/schedules"),
        ("/root/RFdiffusion/models", f"{WEIGHTS}/rfdiffusion_models"),
    ]:
        if os.path.islink(link):
            os.remove(link)
        elif os.path.isdir(link):
            shutil.rmtree(link)
        elif os.path.exists(link):
            os.remove(link)
        os.symlink(target, link)

    if "/root" not in sys.path:
        sys.path.insert(0, "/root")
    if "/root/RFdiffusion" not in sys.path:
        sys.path.append("/root/RFdiffusion")


# ---------------------------------------------------------------------------
# The API - v5's FastAPI app, served on a GPU container
# ---------------------------------------------------------------------------
@app.function(
    image=image,
    gpu="T4",  # upgrade to "L4" / "A10G" for faster jobs
    volumes={WEIGHTS: weights_volume},
    secrets=[modal.Secret.from_name("biogen-secrets")],
    timeout=2 * 60 * 60,      # 8 designs + AF2 validation can run > 1 h on a T4
    scaledown_window=60 * 15,  # linger 15 min after the last request
    max_containers=1,          # in-memory JOBS state -> keep it to one container
    min_containers=0,          # scale to zero when idle (set 1 to kill cold starts)
)
@modal.concurrent(max_inputs=100)  # one container serves the poll + the job
@modal.asgi_app()
def fastapi_app():
    _prepare_runtime()
    import biogen_backend

    # Weights are already on the Volume -> skip the 3-5 min install/download.
    biogen_backend.SETUP_STATE["done"] = True
    biogen_backend.SETUP_STATE["error"] = None
    biogen_backend.SETUP_STATE["step"] = "ready"
    return biogen_backend.app


# ---------------------------------------------------------------------------
# One-time: download ~5 GB of weights into the Volume
#   modal run compute/modal/biogen_modal_app.py::download_weights
# ---------------------------------------------------------------------------
@app.function(image=image, volumes={WEIGHTS: weights_volume}, timeout=60 * 60)
def download_weights(force: bool = False):
    import os
    import subprocess

    os.makedirs(f"{WEIGHTS}/params", exist_ok=True)
    os.makedirs(f"{WEIGHTS}/schedules", exist_ok=True)
    os.makedirs(f"{WEIGHTS}/rfdiffusion_models", exist_ok=True)

    def sh(cmd: str):
        print(f"+ {cmd}", flush=True)
        subprocess.run(cmd, shell=True, check=True)

    def aria2_get(url: str, dest_path: str) -> None:
        # aria2c's -o is a *filename*, always resolved under -d (default cwd)
        # -- passing an absolute path to -o alone silently writes somewhere
        # other than dest_path even though aria2c exits 0. Split dir/name
        # explicitly and verify the file actually landed where expected.
        d = os.path.dirname(dest_path)
        name = os.path.basename(dest_path)
        os.makedirs(d, exist_ok=True)
        sh(f"aria2c -x 16 -s 16 -d '{d}' -o '{name}' "
           f"--max-tries=5 --retry-wait=5 --continue=true --allow-overwrite=true '{url}'")
        if not os.path.isfile(dest_path):
            raise RuntimeError(f"aria2c reported success but {dest_path} is missing (url: {url})")

    # RFdiffusion checkpoints
    for url, name in [(BASE_CKPT_URL, "Base_ckpt.pt"), (COMPLEX_CKPT_URL, "Complex_base_ckpt.pt")]:
        dst = f"{WEIGHTS}/rfdiffusion_models/{name}"
        if force or not os.path.isfile(dst):
            aria2_get(url, dst)

    # Noise schedules: SCHEDULES_URL 404s upstream as of Sep 2026 (UW removed
    # the file) and it's only a precomputed IGSO3 cache anyway -- RFdiffusion
    # computes and writes it itself on first use (inference/model_runners.py)
    # into this same Volume-backed dir, so nothing to fetch here.
    print(f"schedules: left empty, RFdiffusion self-populates {WEIGHTS}/schedules on first run", flush=True)

    # AlphaFold params (~3.5 GB tar) -- land it on the Volume, not the
    # container's local /tmp, so container scratch-disk size is never in play
    af_tar = f"{WEIGHTS}/af_params.tar"
    if force or not os.path.isfile(f"{WEIGHTS}/params/done.txt"):
        aria2_get(AF_PARAMS_URL, af_tar)
        sh(f"tar -xf {af_tar} -C {WEIGHTS}/params")
        os.remove(af_tar)
        sh(f"touch {WEIGHTS}/params/done.txt")

    weights_volume.commit()
    print("weights ready:", sorted(os.listdir(WEIGHTS)), flush=True)


# ---------------------------------------------------------------------------
# Sanity check the GPU image (imports torch/jax/RFdiffusion/colabdesign)
#   modal run compute/modal/biogen_modal_app.py::selftest
# ---------------------------------------------------------------------------
@app.function(image=image, gpu="T4", volumes={WEIGHTS: weights_volume}, timeout=600)
def selftest():
    _prepare_runtime()
    import os

    import torch
    print("torch", torch.__version__, "cuda?", torch.cuda.is_available(),
          torch.cuda.get_device_name(0) if torch.cuda.is_available() else "-")
    import jax
    print("jax", jax.__version__, "devices:", jax.devices())

    os.environ["DGLBACKEND"] = "pytorch"
    from inference.utils import parse_pdb  # noqa: F401  (RFdiffusion)
    from colabdesign.rf.utils import fix_contigs  # noqa: F401
    print("RFdiffusion + ColabDesign import OK")

    for p in ("params/done.txt", "RFdiffusion/schedules", "RFdiffusion/models/Base_ckpt.pt"):
        print(f"  {p}:", "OK" if os.path.exists(f"/root/{p}") else "MISSING (run download_weights)")
    print("  RFdiffusion/schedules is expected empty until the first real job "
          "(self-populated cache, see comment near the symlink map above)")


# ---------------------------------------------------------------------------
# v2 sketch (not wired): durable jobs across containers
# ---------------------------------------------------------------------------
# JOBS_DICT   = modal.Dict.from_name("biogen-jobs", create_if_missing=True)
# RESULTS_VOL = modal.Volume.from_name("biogen-results", create_if_missing=True)
#
# @app.function(image=image, gpu="L4", volumes={WEIGHTS: weights_volume,
#               "/results": RESULTS_VOL}, timeout=3600)
# def run_pipeline_job(job_id: str, params: dict): ...
#
# The asgi app would then .spawn(run_pipeline_job, ...) and read status from
# JOBS_DICT, so closing the browser tab can't kill an in-flight run and
# multiple jobs can run on separate GPUs in parallel.
