from datetime import datetime
from typing import Optional, Union, List, Any
from pydantic import BaseModel, Field


class File(BaseModel):
    """Representation of an uploaded file."""

    filename: str
    content_type: str
    url: Optional[str] = None
    data_uri: Optional[str] = None


class Message(BaseModel):
    """Single chat message."""

    id: str
    chat_id: str
    role: str  # 'user' or 'assistant'
    content: Union[str, List[Any]]
    file: Optional[File] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
