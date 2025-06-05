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
            content=payload.content,  # can be str or list
            file=file,
        )
        assistant_msg = None
        if payload.role == "user":
            # Build conversation for AI response
            history: List[Dict[str, object]] = []
            for m in get_storage().list_messages(payload.chat_id):
                content = m.content
                # If message has a file with data_uri, ensure content is a list
                # and append the image object
                if m.file and m.file.data_uri:
                    image_part = {"type": "input_image", "image_url": m.file.data_uri}
                    if isinstance(content, list):
                        # Only add image if not already present
                        has_image = any(
                            isinstance(part, dict)
                            and part.get("type") == "input_image"
                            for part in content
                        )
                        if not has_image:
                            content = content + [image_part]
                    elif isinstance(content, str):
                        content = [content, image_part]
                    else:
                        content = [image_part]
                # --- FIX: Wrap string parts in {type: "text", text: ...} if
                # content is a list ---
                if isinstance(content, list):
                    new_content = []
                    for part in content:
                        if isinstance(part, str):
                            new_content.append({"type": "input_text", "text": part})
                        else:
                            new_content.append(part)
                    content = new_content
                elif isinstance(content, str):
                    # If content is a string, leave as-is (OpenAI accepts
                    # string for pure text)
                    pass
                history.append({"role": m.role, "content": content})
            try:
                ai_resp = get_openai_service().chat_completion(history)
                ai_content = None
                # Try all known OpenAI response formats
                if "output_text" in ai_resp:
                    ai_content = ai_resp["output_text"]
                elif "choices" in ai_resp and ai_resp["choices"]:
                    ai_content = ai_resp["choices"][0]["message"]["content"]
                elif (
                    "output" in ai_resp and isinstance(ai_resp["output"], list)
                    and ai_resp["output"]
                    and "content" in ai_resp["output"][0]
                    and isinstance(ai_resp["output"][0]["content"], list)
                    and ai_resp["output"][0]["content"]
                    and "text" in ai_resp["output"][0]["content"][0]
                ):
                    ai_content = ai_resp["output"][0]["content"][0]["text"]
                if not ai_content:
                    logger = logging.getLogger(__name__)
                    logger.error(f"Unexpected OpenAI response format: {ai_resp}")
                    ai_content = "[Error: AI response format not recognized]"
                assistant_msg = get_storage().add_message(
                    chat_id=payload.chat_id,
                    role="assistant",
                    content=ai_content,
                )
            except Exception as exc:  # pragma: no cover - network failures
                logger = logging.getLogger(__name__)
                logger.error("Failed to generate AI response: %s", exc)
        if assistant_msg:
            return {"user": user_msg, "assistant": assistant_msg}
        return {"user": user_msg}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat not found")
    except Exception as e:
        logger = logging.getLogger(__name__)
        logger.error(f"Error in create_message: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to create message or generate AI response",
        )
