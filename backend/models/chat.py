from datetime import datetime
from typing import List
from pydantic import BaseModel, Field
from .message import Message


class Chat(BaseModel):
    """Chat session with a list of messages."""

    id: str
    title: str
    messages: List[Message] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
