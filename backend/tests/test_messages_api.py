from fastapi.testclient import TestClient
from backend.main import app


def test_message_crud():
    client = TestClient(app)
    chat_resp = client.post("/chats/", json={"title": "chat"})
    chat_id = chat_resp.json()["id"]

    create = client.post(
        "/messages/",
        json={"chat_id": chat_id, "role": "user", "content": "hi"},
    )
    assert create.status_code == 201
    msg_id = create.json()["id"]
    assert create.json()["content"] == "hi"

    chat_data = client.get(f"/chats/{chat_id}").json()
    assert chat_data["message_count"] == 2

    list_resp = client.get(f"/messages/{chat_id}")
    assert list_resp.status_code == 200
    messages = list_resp.json()
    assert len(messages) == 2
    assert messages[0]["id"] == msg_id
    assert messages[1]["role"] == "assistant"

    missing = client.get("/messages/badid")
    assert missing.status_code == 404


def test_first_message_sets_title():
    client = TestClient(app)
    chat_resp = client.post("/chats/", json={})
    chat_id = chat_resp.json()["id"]

    content = "Hello from the first message"
    client.post(
        "/messages/",
        json={"chat_id": chat_id, "role": "user", "content": content},
    )

    chat_data = client.get(f"/chats/{chat_id}").json()
    assert chat_data["title"] == content[:40]


def test_ai_failure_does_not_error(monkeypatch):
    class BadAI:
        def __init__(self, *a, **kw):
            pass

        def chat_completion(self, _messages):
            raise RuntimeError("boom")

    import api.messages as messages_api

    monkeypatch.setattr(messages_api, "OpenAIService", BadAI)
    messages_api._openai_service = None

    client = TestClient(app)
    chat_id = client.post("/chats/", json={"title": "fail"}).json()["id"]

    resp = client.post(
        "/messages/",
        json={"chat_id": chat_id, "role": "user", "content": "hi"},
    )
    assert resp.status_code == 201
    assert resp.json()["role"] == "user"

    chat_data = client.get(f"/chats/{chat_id}").json()
    assert chat_data["message_count"] == 1
