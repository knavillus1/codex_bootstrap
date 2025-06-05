"""Message API endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging

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
        user_msg = get_storage().add_message(
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
            try:
                ai_resp = get_openai_service().chat_completion(history)
                ai_content = ai_resp["choices"][0]["message"]["content"]
                get_storage().add_message(
                    chat_id=payload.chat_id,
                    role="assistant",
                    content=ai_content,
                )
                # Return all messages for the chat, including the new AI one
                return get_storage().list_messages(payload.chat_id)
            except Exception as exc:  # pragma: no cover - network failures
                logger = logging.getLogger(__name__)
                logger.error("Failed to generate AI response: %s", exc)
                # If AI fails, still return the user's message and any prior messages
                return get_storage().list_messages(payload.chat_id)
        # If not a user message, or if AI response failed and we already returned.
        # This part should ideally not be reached if role is 'user' due to returns above.
        # However, to be safe, return the user_msg if it's not a user role,
        # or all messages if something went wrong with AI and we fell through.
        if payload.role != "user":
            return [user_msg]  # Return as a list for consistency
        return get_storage().list_messages(payload.chat_id)  # Fallback
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
    except Exception as e:
        logger = logging.getLogger(__name__)
        logger.error(f"Error in create_message: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to create message or generate AI response")
