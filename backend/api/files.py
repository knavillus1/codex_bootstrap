"""File upload API endpoints."""

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse

from backend.services.file_service import FileService

router = APIRouter(prefix="/files", tags=["files"])

_service: FileService | None = None


def get_service() -> FileService:
    """Get the file service instance, creating it if needed."""
    global _service
    if _service is None:
        _service = FileService()
    return _service


@router.post("/", status_code=201)
async def upload_file(file: UploadFile = File(...)) -> dict:
    """Validate and save an uploaded file."""
    try:
        path = get_service().save_upload(file)
    except ValueError as exc:  # invalid type or size
        raise HTTPException(status_code=400, detail=str(exc))
    return {"filename": path.name}


@router.get("/{filename}")
async def get_file(filename: str):
    """Serve an uploaded file."""
    service = get_service()
    file_path = service.get_file_path(filename)

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path)
