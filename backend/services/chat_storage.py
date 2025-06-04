import json
from pathlib import Path
from typing import List

from backend.models.chat import Chat


class ChatStorage:
    """Persist chats to JSON files in a directory."""

    def __init__(self, data_dir: Path | None = None):
        self.data_dir = data_dir or Path(__file__).resolve().parent.parent / "data"
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def _chat_path(self, chat_id: str) -> Path:
        return self.data_dir / f"{chat_id}.json"

    def save_chat(self, chat: Chat) -> None:
        """Write chat data to disk."""
        self._chat_path(chat.id).write_text(chat.json(), encoding="utf-8")

    def load_chat(self, chat_id: str) -> Chat:
        """Load a chat by id."""
        data = json.loads(self._chat_path(chat_id).read_text(encoding="utf-8"))
        return Chat(**data)

    def list_chats(self) -> List[Chat]:
        """Return all stored chats."""
        chats: List[Chat] = []
        for file in self.data_dir.glob("*.json"):
            data = json.loads(file.read_text(encoding="utf-8"))
            chats.append(Chat(**data))
        return chats
