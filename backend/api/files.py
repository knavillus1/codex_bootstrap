from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/")
async def upload_file() -> dict:
    """Placeholder for uploading a file."""
    raise HTTPException(status_code=501, detail="Not implemented")
