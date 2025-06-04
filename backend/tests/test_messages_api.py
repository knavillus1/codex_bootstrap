from fastapi.testclient import TestClient
import backend.api.chat as chat_api
import backend.api.messages as messages_api
from backend.main import app
from backend.services.chat_storage import ChatStorage


def setup_tmp_storage(tmp_path):
    storage = ChatStorage(data_dir=tmp_path)
    chat_api._storage = storage
    messages_api._storage = storage
    return TestClient(app)


def test_message_crud(tmp_path):
    client = setup_tmp_storage(tmp_path)
    chat_resp = client.post("/chats/", json={"title": "chat"})
    chat_id = chat_resp.json()["id"]

    create = client.post(
        "/messages/",
        json={"chat_id": chat_id, "role": "user", "content": "hi"},
    )
    assert create.status_code == 201
    msg_id = create.json()["id"]
    assert create.json()["content"] == "hi"

    list_resp = client.get(f"/messages/{chat_id}")
    assert list_resp.status_code == 200
    messages = list_resp.json()
    assert len(messages) == 1
    assert messages[0]["id"] == msg_id

    missing = client.get("/messages/badid")
    assert missing.status_code == 404


def test_first_message_sets_title(tmp_path):
    client = setup_tmp_storage(tmp_path)
    chat_resp = client.post("/chats/", json={})
    chat_id = chat_resp.json()["id"]

    content = "Hello from the first message"
    client.post(
        "/messages/",
        json={"chat_id": chat_id, "role": "user", "content": content},
    )

    chat_data = client.get(f"/chats/{chat_id}").json()
    assert chat_data["title"] == content[:40]
