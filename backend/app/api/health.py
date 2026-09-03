from fastapi import APIRouter
from app.models.schemas import BackendHealth

router = APIRouter()

@router.get("/health", response_model=BackendHealth)
def health_check():
    return BackendHealth(
        status="ok",
        gpu_name="Mock GPU (Dev)",
        gpu_memory_total_mb=16384,
        gpu_memory_free_mb=15000,
        cuda_available=True,
        gpu_available=True,
        rfdiffusion_ready=True,
        models_ready=True,
        version="2.0.0",
        active_jobs=0,
        message="Running in Mock Mode (local dev backend)"
    )
