"""Message API endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.chat_storage import ChatStorage

router = APIRouter(prefix="/messages", tags=["messages"])

_storage = None


def get_storage():
    """Get the chat storage instance, creating it if needed."""
    global _storage
    if _storage is None:
        _storage = ChatStorage()
    return _storage


class MessageCreate(BaseModel):
    chat_id: str
    role: str = "user"
    content: str


@router.get("/{chat_id}")
async def list_messages(chat_id: str):
    """List messages for a chat."""
    try:
        return get_storage().list_messages(chat_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")


@router.post("/", status_code=201)
async def create_message(payload: MessageCreate):
    """Create a new message for a chat."""
    try:
        return get_storage().add_message(
            chat_id=payload.chat_id,
            role=payload.role,
            content=payload.content,
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
