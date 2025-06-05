"""Message API endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict

from config import settings
from services.openai_service import OpenAIService

from services.chat_storage import ChatStorage
from models.message import File

router = APIRouter(prefix="/messages", tags=["messages"])

_storage = None
_openai_service: OpenAIService | None = None


def get_storage():
    """Get the chat storage instance, creating it if needed."""
    global _storage
    if _storage is None:
        _storage = ChatStorage()
    return _storage


def get_openai_service() -> OpenAIService:
    """Get the OpenAI service instance, creating it if needed."""
    global _openai_service
    if _openai_service is None:
        _openai_service = OpenAIService(api_key=settings.OPENAI_API_KEY)
    return _openai_service


class MessageCreate(BaseModel):
    chat_id: str
    role: str = "user"
    content: str
    file: Optional[File] = None


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
        msg = get_storage().add_message(
            chat_id=payload.chat_id,
            role=payload.role,
            content=payload.content,
            file=payload.file,
        )
        if payload.role == "user":
            # Build conversation for AI response
            history: List[Dict[str, str]] = [
                {"role": m.role, "content": m.content}
                for m in get_storage().list_messages(payload.chat_id)
            ]
            ai_resp = get_openai_service().chat_completion(history)
            ai_content = ai_resp["choices"][0]["message"]["content"]
            get_storage().add_message(
                chat_id=payload.chat_id,
                role="assistant",
                content=ai_content,
            )
        return msg
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to generate AI response")
