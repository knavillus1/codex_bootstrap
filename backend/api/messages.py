"""Message API endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging
import base64
import mimetypes
import api.files as files_api

from config import settings
from services.openai_service import OpenAIService

from services.chat_storage import ChatStorage
from models.message import File

router = APIRouter(prefix="/messages", tags=["messages"])

_storage = None
_openai_service: OpenAIService | None = None


def _to_data_uri(path: str) -> str:
    mime, _ = mimetypes.guess_type(path)
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime or 'image/png'};base64,{b64}"


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
        file = payload.file
        if file and file.content_type.startswith("image/"):
            path = files_api.get_service().get_file_path(file.filename)
            if path.exists():
                data = file.model_dump(exclude={"data_uri"})
                file = File(**data, data_uri=_to_data_uri(str(path)))

        user_msg = get_storage().add_message(
            chat_id=payload.chat_id,
            role=payload.role,
            content=payload.content,
            file=file,
        )
        if payload.role == "user":
            # Build conversation for AI response
            history: List[Dict[str, object]] = []
            for m in get_storage().list_messages(payload.chat_id):
                if m.file and m.file.data_uri:
                    history.append(
                        {
                            "role": m.role,
                            "content": [
                                m.content,
                                {
                                    "type": "input_image",
                                    "image_url": m.file.data_uri,
                                },
                            ],
                        }
                    )
                else:
                    history.append({"role": m.role, "content": m.content})
            try:
                ai_resp = get_openai_service().chat_completion(history)
                ai_content = (
                    ai_resp.get("output_text")
                    or ai_resp["choices"][0]["message"]["content"]
                )
                get_storage().add_message(
                    chat_id=payload.chat_id,
                    role="assistant",
                    content=ai_content,
                )
            except Exception as exc:  # pragma: no cover - network failures
                logger = logging.getLogger(__name__)
                logger.error("Failed to generate AI response: %s", exc)
        return user_msg
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
    except Exception as e:
        logger = logging.getLogger(__name__)
        logger.error(f"Error in create_message: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to create message or generate AI response",
        )
