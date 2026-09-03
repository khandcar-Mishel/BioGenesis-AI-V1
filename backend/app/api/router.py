from fastapi import APIRouter
from app.api import jobs, pdb, health

router = APIRouter(prefix="/api/v1")
router.include_router(health.router, tags=["health"])
router.include_router(pdb.router, tags=["pdb"])
router.include_router(jobs.router, tags=["jobs"])
