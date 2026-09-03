from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import PlainTextResponse
from app.models.schemas import RFdiffusionParams, JobStatusResponse, JobStatus
import math
import random
import time
import uuid

router = APIRouter(prefix="/jobs")

# In-memory job store. The RFdiffusion execution itself is simulated:
# swap run_rfdiffusion() for a subprocess call to run_inference.py to go live.
JOBS: dict[str, JobStatusResponse] = {}
RESULTS: dict[str, dict[str, str]] = {}

AMINO_ACIDS = ["ALA", "ARG", "ASN", "ASP", "CYS", "GLN", "GLU", "GLY", "HIS", "ILE",
               "LEU", "LYS", "MET", "PHE", "PRO", "SER", "THR", "TRP", "TYR", "VAL"]


def _parse_contig_length(contigs: str) -> int:
    """Best-effort residue count from a contig string like '100', 'A:50-70' or '40/A163-181/40'."""
    digits: list[int] = []
    for token in contigs.replace("/", " ").split():
        if ":" in token:
            token = token.split(":")[-1]
        if "-" in token:
            try:
                lo, hi = token.split("-")[:2]
                digits.append(int(hi) - int(lo) + 1)
                continue
            except ValueError:
                pass
        if token.isdigit():
            digits.append(int(token))
    return sum(digits) if digits else 100


def generate_mock_pdb(name: str, design_index: int, num_residues: int) -> str:
    """Generate a plausible alpha-helical backbone as a stand-in for an RFdiffusion output."""
    rng = random.Random(f"{name}:{design_index}")
    lines: list[str] = []
    atom_serial = 1
    for i in range(num_residues):
        angle = math.radians(i * 100.0)
        radius = 2.3
        rise = 1.5 * i
        # Slightly jittered helix so each design looks distinct
        jitter = rng.uniform(-0.15, 0.15)
        cx = radius * math.cos(angle) + jitter
        cy = radius * math.sin(angle) + jitter
        cz = rise
        res = rng.choice(AMINO_ACIDS)
        # Backbone N/CA/C/O placed around the CA position
        atoms = [
            ("N", cx - 0.9, cy - 0.4, cz - 1.0),
            ("CA", cx, cy, cz),
            ("C", cx + 0.8, cy + 0.6, cz + 0.9),
            ("O", cx + 1.6, cy + 1.4, cz + 0.6),
        ]
        for atom_name, x, y, z in atoms:
            element = atom_name[0]
            lines.append(
                f"ATOM  {atom_serial:5d}  {atom_name:<3s} {res:>3s} A{i + 1:4d}    "
                f"{x:8.3f}{y:8.3f}{z:8.3f}  1.00 {rng.uniform(15.0, 35.0):5.2f}          {element:>2s}  "
            )
            atom_serial += 1
    lines.append("TER")
    lines.append("END")
    return "\n".join(lines) + "\n"


def run_rfdiffusion(job_id: str, params: RFdiffusionParams) -> None:
    """Simulated RFdiffusion run: advances progress in the background and produces mock PDB outputs."""
    job = JOBS.get(job_id)
    if job is None:
        return
    try:
        job.status = JobStatus.RUNNING
        job.status_message = "Initializing RFdiffusion..."
        job.updated_at = time.time()
        time.sleep(1.0)

        job.recent_logs = ["RFdiffusion models loaded (mock weights)",
                           f"Contigs: {params.contigs or '(full denoise)'}"]

        num_residues = _parse_contig_length(params.contigs)
        ticks = 20
        for tick in range(1, ticks + 1):
            if job.status == JobStatus.CANCELLED:
                return
            time.sleep(0.5)
            job.progress_pct = round(tick / ticks * 100.0, 1)
            job.current_step = int(job.progress_pct / 100.0 * params.iterations)
            job.current_design = max(1, int(math.ceil(tick / ticks * params.num_designs)))
            job.status_message = f"Generating design {job.current_design}/{params.num_designs}... ({int(job.progress_pct)}%)"
            if tick % 5 == 0:
                job.recent_logs.append(f"Diffusion step {job.current_step}/{params.iterations} complete")
                job.recent_logs = job.recent_logs[-8:]
            job.updated_at = time.time()

        job.status_message = "Packaging results..."
        job.updated_at = time.time()
        time.sleep(0.5)

        outputs: dict[str, str] = {}
        for i in range(params.num_designs):
            filename = f"{params.name}_design_{i + 1}.pdb"
            outputs[filename] = generate_mock_pdb(params.name, i, num_residues)
        RESULTS[job_id] = outputs

        job.status = JobStatus.COMPLETED
        job.progress_pct = 100.0
        job.current_design = params.num_designs
        job.current_step = params.iterations
        job.status_message = "Completed"
        job.output_files = list(outputs.keys())
        job.generated_pdb_urls = [f"/api/v1/jobs/{job_id}/results/{f}" for f in outputs.keys()]
        job.has_results_zip = False
        job.recent_logs.append(f"Generated {len(outputs)} design(s) of {num_residues} residues")
        job.updated_at = time.time()
    except Exception as e:  # keep the job in a terminal state no matter what
        job.status = JobStatus.FAILED
        job.status_message = "Failed"
        job.error_message = str(e)
        job.updated_at = time.time()


@router.post("", status_code=201)
def submit_job(params: RFdiffusionParams, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    job = JobStatusResponse(
        job_id=job_id,
        name=params.name,
        status=JobStatus.QUEUED,
        total_designs=params.num_designs,
        total_steps=params.iterations,
        status_message="Queued",
        created_at=time.time(),
        updated_at=time.time()
    )
    JOBS[job_id] = job
    background_tasks.add_task(run_rfdiffusion, job_id, params)
    return {"job_id": job_id, "status": "queued"}


@router.get("/{job_id}", response_model=JobStatusResponse)
def get_job(job_id: str):
    job = JOBS.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status in (JobStatus.RUNNING, JobStatus.PREPARING, JobStatus.QUEUED):
        job.runtime_seconds = time.time() - job.created_at
    return job


@router.post("/{job_id}/cancel")
def cancel_job(job_id: str):
    job = JOBS.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status in (JobStatus.QUEUED, JobStatus.PREPARING, JobStatus.RUNNING):
        job.status = JobStatus.CANCELLED
        job.status_message = "Cancelled by user"
        job.updated_at = time.time()
    return {"job_id": job_id, "status": job.status.value}


@router.get("/{job_id}/results/{filename}", response_class=PlainTextResponse)
def get_result_file(job_id: str, filename: str):
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail="Job not found")
    content = RESULTS.get(job_id, {}).get(filename)
    if content is None:
        raise HTTPException(status_code=404, detail="Result file not found")
    return PlainTextResponse(
        content,
        media_type="chemical/x-pdb",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


@router.get("", response_model=list[JobStatusResponse])
def list_jobs():
    return sorted(JOBS.values(), key=lambda j: j.created_at, reverse=True)
