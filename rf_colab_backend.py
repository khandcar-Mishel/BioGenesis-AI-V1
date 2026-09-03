import os
import time
import uuid
import subprocess
import uvicorn
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from pyngrok import ngrok
import nest_asyncio

# --- Schemas ---
class RFdiffusionParams(BaseModel):
    name: str = "test_design"
    contigs: str = "100"
    pdb: Optional[str] = ""
    iterations: int = 50
    hotspot: Optional[str] = ""
    num_designs: int = 1
    symmetry: str = "none"
    order: int = 1
    chains: Optional[str] = ""
    add_potential: bool = False
    visual: str = "none"

class BackendHealth(BaseModel):
    status: str = "ready"
    gpu_name: str = "Colab GPU"
    gpu_memory_total_mb: float = 16384
    gpu_memory_free_mb: float = 15000
    cuda_available: bool = True
    rfdiffusion_ready: bool = True
    models_ready: bool = True
    version: str = "2.0.0"
    active_jobs: int = 0
    message: str = "Running on Google Colab"

class JobStatusResponse(BaseModel):
    job_id: str
    name: str
    status: str
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

# --- App Setup ---
app = FastAPI(title="BioGen AI Colab Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JOBS_DB: Dict[str, JobStatusResponse] = {}

@app.get("/")
def root():
    return {"status": "ok", "message": "BioGen AI Colab Backend is running."}

@app.get("/api/v1/health", response_model=BackendHealth)
def health_check():
    active_jobs = sum(1 for j in JOBS_DB.values() if j.status in ["running", "preparing"])
    return BackendHealth(active_jobs=active_jobs)

def run_rfdiffusion(job_id: str, params: RFdiffusionParams):
    """
    Task to execute RFDiffusion.
    In a real Colab environment, this would call subprocess.run() to invoke RFdiffusion's run_inference.py
    """
    job = JOBS_DB[job_id]
    job.status = "running"
    job.status_message = "Initializing RFDiffusion..."
    job.updated_at = time.time()
    
    # -------------------------------------------------------------
    # TODO: Replace the mock loop below with actual RFdiffusion CLI
    # Example:
    # cmd = f"python /content/RFdiffusion/scripts/run_inference.py inference.output_prefix=/content/outputs/{params.name} inference.num_designs={params.num_designs} ..."
    # subprocess.run(cmd, shell=True)
    # -------------------------------------------------------------
    
    for i in range(1, 11):
        time.sleep(1.5)  # Mocking generation time
        if job.status == "cancelled":
            break
        job.progress_pct = i * 10.0
        job.current_step = int((i * 10.0 / 100.0) * params.iterations)
        job.status_message = f"Generating design... ({int(job.progress_pct)}%)"
        job.updated_at = time.time()
        job.runtime_seconds = job.updated_at - job.created_at

    if job.status != "cancelled":
        job.status = "completed"
        job.progress_pct = 100.0
        job.status_message = "Completed"
        job.output_files = [f"{params.name}_{i}.pdb" for i in range(params.num_designs)]
        job.updated_at = time.time()
        job.runtime_seconds = job.updated_at - job.created_at

@app.post("/api/v1/jobs", status_code=201)
def submit_job(params: RFdiffusionParams, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    job = JobStatusResponse(
        job_id=job_id,
        name=params.name,
        status="queued",
        total_designs=params.num_designs,
        total_steps=params.iterations,
        created_at=time.time(),
        updated_at=time.time()
    )
    JOBS_DB[job_id] = job
    
    background_tasks.add_task(run_rfdiffusion, job_id, params)
    
    return {"job_id": job_id, "status": "running"}

@app.get("/api/v1/jobs/{job_id}", response_model=JobStatusResponse)
def get_job(job_id: str):
    if job_id not in JOBS_DB:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = JOBS_DB[job_id]
    if job.status in ["running", "preparing"]:
        job.runtime_seconds = time.time() - job.created_at
    return job

if __name__ == "__main__":
    # Ensure nest_asyncio is applied for Colab
    nest_asyncio.apply()

    ngrok_token = os.environ.get("NGROK_AUTHTOKEN", "")
    if ngrok_token:
        try:
            ngrok.set_auth_token(ngrok_token)
            # Create a tunnel to port 8000
            public_url = ngrok.connect(8000).public_url
            print(f"\n{'='*60}")
            print(f"🚀 BioGen AI Colab Backend is running!")
            print(f"🔗 Public URL: {public_url}")
            print(f"   Paste this URL into your BioGen Web App settings.")
            print(f"{'='*60}\n")
        except Exception as e:
            print(f"Failed to start ngrok tunnel: {e}")
    else:
        print("WARNING: NGROK_AUTHTOKEN not found in environment.")
        print("The server will start, but it won't be exposed to the internet.")

    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=8000)
