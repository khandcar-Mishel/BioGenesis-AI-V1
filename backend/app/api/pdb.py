import re
import urllib.request

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.schemas import StructureInfo

router = APIRouter(prefix="/pdb")

RCSB_URL = "https://files.rcsb.org/download/{pdb_id}.pdb"


class PDBFetchRequest(BaseModel):
    pdb_id: str


def _parse_structure_info(pdb_id: str, content: str) -> StructureInfo:
    chains: list[str] = []
    residues: set[tuple[str, str]] = set()
    for line in content.splitlines():
        if line.startswith(("ATOM  ", "HETATM")) and line[21:22].strip():
            chain = line[21]
            if chain not in chains:
                chains.append(chain)
            if line.startswith("ATOM  "):
                residues.add((chain, line[22:27]))
    title = ""
    for line in content.splitlines():
        if line.startswith("TITLE "):
            title += " " + line[10:].strip()
        elif title and not line.startswith("TITLE "):
            break
    return StructureInfo(
        pdb_id=pdb_id,
        title=title.strip() or f"Structure {pdb_id}",
        organism="",
        chains=chains,
        num_residues=len(residues),
        source="RCSB",
        pdb_content=content,
    )


@router.post("/fetch", response_model=StructureInfo)
def fetch_pdb(req: PDBFetchRequest):
    pdb_id = re.sub(r"[^A-Za-z0-9]", "", req.pdb_id).upper()
    if not pdb_id:
        raise HTTPException(status_code=422, detail="A PDB ID is required")
    url = RCSB_URL.format(pdb_id=pdb_id)
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            content = resp.read().decode("utf-8", errors="replace")
    except Exception:
        raise HTTPException(status_code=404, detail=f"PDB entry '{pdb_id}' not found on RCSB")
    return _parse_structure_info(pdb_id, content)
