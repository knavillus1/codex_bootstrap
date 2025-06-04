"""Message API endpoints."""

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("/")
async def list_messages() -> list:
    """Placeholder for listing messages."""
    return []


@router.post("/")
async def create_message() -> dict:
    """Placeholder for creating a message."""
    raise HTTPException(status_code=501, detail="Not implemented")
