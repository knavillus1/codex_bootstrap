from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import AsyncGenerator, List

from backend.config import settings
from backend.services.openai_service import OpenAIService
from backend.services.chat_storage import ChatStorage


router = APIRouter(prefix="/stream", tags=["stream"])

_storage: ChatStorage | None = None
_openai_service: OpenAIService | None = None


def get_storage() -> ChatStorage:
    global _storage
    if _storage is None:
        _storage = ChatStorage()
    return _storage


def get_openai_service() -> OpenAIService:
    global _openai_service
    if _openai_service is None:
        _openai_service = OpenAIService(api_key=settings.OPENAI_API_KEY)
    return _openai_service


def format_sse(data: str, event: str = "message") -> str:
    return f"event: {event}\ndata: {data}\n\n"


class StreamRequest(BaseModel):
    chat_id: str
    content: str


@router.post("/")
async def stream(payload: StreamRequest):
    storage = get_storage()
    storage.add_message(
        chat_id=payload.chat_id,
        role="user",
        content=payload.content,
    )
    history: List[dict] = []
    for m in storage.list_messages(payload.chat_id):
        content = m.content
        if m.file and m.file.data_uri:
            image_part = {
                "type": "input_image",
                "image_url": m.file.data_uri,
            }
            if isinstance(content, list):
                content = content + [image_part]
            else:
                content = (
                    [content, image_part]
                    if isinstance(content, str)
                    else [image_part]
                )
        history.append({"role": m.role, "content": content})

    async def generator() -> AsyncGenerator[str, None]:
        assistant_content = ""
        async for chunk in get_openai_service().chat_completion_stream(history):
            try:
                data = chunk
                if isinstance(data, str):
                    import json

                    data = json.loads(data)
                delta = (
                    data.get("choices", [{}])[0]
                    .get("delta", {})
                    .get("content", "")
                )
                assistant_content += delta
                if delta:
                    yield format_sse(delta)
            except Exception:
                pass
        if assistant_content.strip():
            storage.add_message(
                chat_id=payload.chat_id,
                role="assistant",
                content=assistant_content,
            )
        yield format_sse("[DONE]", event="done")

    return StreamingResponse(generator(), media_type="text/event-stream")
