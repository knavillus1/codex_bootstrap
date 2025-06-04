"""File upload API endpoints."""

from fastapi import APIRouter, HTTPException, UploadFile, File

from services.file_service import FileService

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
