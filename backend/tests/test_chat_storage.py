from pathlib import Path
from uuid import uuid4

from backend.models.chat import Chat
from backend.models.message import Message
from backend.services.chat_storage import ChatStorage


def test_chat_storage(tmp_path: Path) -> None:
    storage = ChatStorage(data_dir=tmp_path)
    chat_id = str(uuid4())
    chat = Chat(id=chat_id, title="test", messages=[
        Message(id=str(uuid4()), chat_id=chat_id, role="user", content="hi")
    ])
    storage.save_chat(chat)

    loaded = storage.load_chat(chat_id)
    assert loaded.id == chat_id
    assert loaded.messages[0].content == "hi"

    chats = storage.list_chats()
    assert len(chats) == 1
    assert chats[0].id == chat_id
