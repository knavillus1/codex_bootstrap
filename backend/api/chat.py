"""Chat API endpoints."""

from fastapi import APIRouter

from backend.services.chat_storage import ChatStorage

router = APIRouter(prefix="/chats", tags=["chats"])

_storage = ChatStorage()


@router.get("/")
async def list_chats():
    """List all stored chats."""
    return _storage.list_chats()
