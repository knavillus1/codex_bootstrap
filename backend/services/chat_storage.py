import json
from datetime import datetime
from pathlib import Path
from typing import List
from uuid import uuid4

from backend.models.chat import Chat
from backend.models.message import Message


class ChatStorage:
    """Persist chats to JSON files in a directory."""

    def __init__(self, data_dir: Path | None = None):
        self.data_dir = data_dir or Path(__file__).resolve().parent.parent / "data"
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def _chat_path(self, chat_id: str) -> Path:
        return self.data_dir / f"{chat_id}.json"

    def create_chat(self, title: str | None = None) -> Chat:
        """Create and persist a new chat."""
        chat_id = uuid4().hex
        title = title or f"Chat {datetime.utcnow().strftime('%Y-%m-%d %H:%M')}"
        chat = Chat(id=chat_id, title=title)
        self.save_chat(chat)
        return chat

    def save_chat(self, chat: Chat) -> None:
        """Write chat data to disk."""
        self._chat_path(chat.id).write_text(chat.json(), encoding="utf-8")

    def load_chat(self, chat_id: str) -> Chat:
        """Load a chat by id."""
        data = json.loads(self._chat_path(chat_id).read_text(encoding="utf-8"))
        return Chat(**data)

    def delete_chat(self, chat_id: str) -> None:
        """Remove a chat from storage."""
        self._chat_path(chat_id).unlink()

    def list_chats(self) -> List[Chat]:
        """Return all stored chats sorted by newest first."""
        chats: List[Chat] = []
        for file in self.data_dir.glob("*.json"):
            data = json.loads(file.read_text(encoding="utf-8"))
            chats.append(Chat(**data))
        chats.sort(key=lambda c: c.created_at, reverse=True)
        return chats

    def add_message(self, chat_id: str, role: str, content: str) -> Message:
        """Add a message to a chat and persist it."""
        chat = self.load_chat(chat_id)
        message = Message(
            id=uuid4().hex,
            chat_id=chat_id,
            role=role,
            content=content,
        )
        chat.messages.append(message)
        self.save_chat(chat)
        return message

    def list_messages(self, chat_id: str) -> List[Message]:
        """Return all messages for a chat."""
        chat = self.load_chat(chat_id)
        return chat.messages
