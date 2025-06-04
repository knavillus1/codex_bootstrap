"""Chat API endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.chat_storage import ChatStorage

router = APIRouter(prefix="/chats", tags=["chats"])

_storage = None


def get_storage():
    """Get the chat storage instance, creating it if needed."""
    global _storage
    if _storage is None:
        _storage = ChatStorage()
    return _storage


@router.get("/")
async def list_chats():
    """List all stored chats."""
    return get_storage().list_chats()


class ChatCreateRequest(BaseModel):
    title: str | None = None


@router.post("/", status_code=201)
async def create_chat(payload: ChatCreateRequest):
    """Create a new chat session."""
    chat = get_storage().create_chat(title=payload.title)
    return chat


@router.get("/{chat_id}")
async def get_chat(chat_id: str):
    """Retrieve a chat by id."""
    try:
        return get_storage().load_chat(chat_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")


@router.delete("/{chat_id}", status_code=204)
async def delete_chat(chat_id: str) -> None:
    """Delete a chat by id."""
    try:
        get_storage().delete_chat(chat_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
