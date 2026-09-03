from enum import Enum
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
import re

class DesignType(str, Enum):
    UNCONDITIONAL = "Unconditional"
    BINDER_DESIGN = "Binder Design"
    MOTIF_SCAFFOLDING = "Motif Scaffolding"
    PARTIAL_DIFFUSION = "Partial Diffusion"

class SymmetryType(str, Enum):
    NONE = "none"
    AUTO = "auto"
    CYCLIC = "cyclic"
    DIHEDRAL = "dihedral"

class JobStatus(str, Enum):
    QUEUED = "queued"
    PREPARING = "preparing"
    RUNNING = "running"
    PACKAGING = "packaging"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class DesignPreset(BaseModel):
    name: str
    design_type: DesignType
    contigs: str
    pdb: str = ""
    hotspot: str = ""
    iterations: int = 50
    symmetry: SymmetryType = SymmetryType.NONE
    order: int = 1
    chains: str = ""
    add_potential: bool = False
    description: str

DESIGN_PRESETS: Dict[DesignType, List[DesignPreset]] = {
    DesignType.UNCONDITIONAL: [
        DesignPreset(
            name="monomer_100",
            design_type=DesignType.UNCONDITIONAL,
            contigs="100",
            iterations=50,
            description="De novo monomer of 100 residues without conditioning."
        ),
        DesignPreset(
            name="hetero_oligomer",
            design_type=DesignType.UNCONDITIONAL,
            contigs="50:100",
            iterations=50,
            description="De novo hetero-oligomer with 50 and 100 residue chains."
        ),
        DesignPreset(
            name="homo_dimer_c2",
            design_type=DesignType.UNCONDITIONAL,
            contigs="60",
            iterations=50,
            symmetry=SymmetryType.CYCLIC,
            order=2,
            add_potential=True,
            description="C2 cyclic symmetric homo-dimer (60 res per subunit)."
        ),
    ],
    DesignType.BINDER_DESIGN: [
        DesignPreset(
            name="pdl1_binder",
            design_type=DesignType.BINDER_DESIGN,
            pdb="4N5T",
            chains="A",
            contigs="A:50-70",
            hotspot="",
            iterations=50,
            description="Design a 50-70 residue binder targeting Chain A of 4N5T."
        ),
        DesignPreset(
            name="hotspot_guided_binder",
            design_type=DesignType.BINDER_DESIGN,
            pdb="5KQV",
            chains="E",
            contigs="E6-155:70-100",
            hotspot="E64,E88,E96",
            iterations=50,
            description="Target residue hotspots E64, E88, E96 on 5KQV (residues 6-155)."
        ),
    ],
    DesignType.MOTIF_SCAFFOLDING: [
        DesignPreset(
            name="motif_scaffold_rsv",
            design_type=DesignType.MOTIF_SCAFFOLDING,
            pdb="5TPN",
            contigs="40/A163-181/40",
            iterations=50,
            description="Scaffold RSV Site II epitope (A163-181) with 40-residue flanking backbones."
        ),
        DesignPreset(
            name="loop_closure",
            design_type=DesignType.MOTIF_SCAFFOLDING,
            pdb="6MRR",
            contigs="A3-30/36/A33-68",
            iterations=50,
            description="Scaffold a 36-residue loop connecting two helices (A3-30 and A33-68)."
        ),
    ],
    DesignType.PARTIAL_DIFFUSION: [
        DesignPreset(
            name="full_denoise",
            design_type=DesignType.PARTIAL_DIFFUSION,
            pdb="6MRR",
            contigs="",
            iterations=50,
            description="Noise all backbone coordinates and diffuse back to create subtle variants."
        ),
        DesignPreset(
            name="fixed_terminal",
            design_type=DesignType.PARTIAL_DIFFUSION,
            pdb="6MRR",
            contigs="A1-10",
            iterations=50,
            description="Fix positions A1-10 and resample the remaining structure."
        ),
    ]
}

class RFdiffusionParams(BaseModel):
    name: str = Field(default="test_design", description="Design job name identifier")
    contigs: str = Field(default="100", description="RFdiffusion contig definition syntax")
    pdb: Optional[str] = Field(default="", description="PDB Code, local path, or AlphaFold ID")
    pdb_content: Optional[str] = Field(default="", description="Full PDB text for uploaded target structures")
    iterations: int = Field(default=50, ge=10, le=500, description="Diffusion steps (T)")
    hotspot: Optional[str] = Field(default="", description="Target hotspot residues (e.g. E64,E88,E96)")
    num_designs: int = Field(default=1, ge=1, le=32, description="Number of backbones to generate")
    symmetry: SymmetryType = Field(default=SymmetryType.NONE, description="Symmetry constraint")
    order: int = Field(default=1, ge=1, le=12, description="Symmetry order (e.g. 2 for C2/D2)")
    chains: Optional[str] = Field(default="", description="Filtered chains from input PDB (e.g. 'A,B')")
    add_potential: bool = Field(default=False, description="Guiding potentials to discourage inter-chain clashes")
    visual: str = Field(default="none", description="Colab notebook visual argument (kept for compatibility)")

    @field_validator("name")
    def validate_name(cls, v: str) -> str:
        clean = re.sub(r"[^a-zA-Z0-9_\-]", "_", v.strip())
        if not clean:
            return "rf_design"
        return clean

    @field_validator("contigs")
    def validate_contigs(cls, v: str) -> str:
        v = v.strip()
        return v

    @field_validator("hotspot")
    def validate_hotspot(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return ""
        return v.replace(" ", "").replace("'", "").replace('"', "")

    def sanitize_for_execution(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "contigs": self.contigs,
            "pdb": self.pdb or "",
            "iterations": int(self.iterations),
            "hotspot": self.hotspot or "",
            "num_designs": int(self.num_designs),
            "symmetry": self.symmetry.value if isinstance(self.symmetry, SymmetryType) else str(self.symmetry),
            "order": int(self.order),
            "chains": self.chains or "",
            "add_potential": bool(self.add_potential),
            "visual": "none"
        }

class BackendHealth(BaseModel):
    status: str = "offline"
    gpu_name: Optional[str] = "N/A"
    gpu_memory_total_mb: Optional[float] = 0.0
    gpu_memory_free_mb: Optional[float] = 0.0
    cuda_available: bool = False
    gpu_available: bool = False
    rfdiffusion_ready: bool = False
    models_ready: bool = False
    version: str = "2.0.0"
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
