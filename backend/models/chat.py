from datetime import datetime
from typing import List
from pydantic import BaseModel, Field
from models.message import Message


class Chat(BaseModel):
    """Chat session with a list of messages."""

    id: str
    title: str
    messages: List[Message] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    message_count: int = 0
    last_activity: datetime = Field(default_factory=datetime.utcnow)
