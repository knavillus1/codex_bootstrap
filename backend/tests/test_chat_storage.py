from pathlib import Path
from backend.services.chat_storage import ChatStorage


def test_chat_storage(tmp_path: Path) -> None:
    storage = ChatStorage(data_dir=tmp_path)
    chat = storage.create_chat(title="test")
    storage.add_message(chat.id, role="user", content="hi")

    loaded = storage.load_chat(chat.id)
    assert loaded.id == chat.id
    assert loaded.messages[0].content == "hi"

    chats = storage.list_chats()
    assert len(chats) == 1
    assert chats[0].id == chat.id
