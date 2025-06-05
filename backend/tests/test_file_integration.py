from fastapi.testclient import TestClient
from backend.main import app
from backend.services.file_service import FileService
import api.files as files_api
import api.messages as messages_api


class DummyAI:
    def __init__(self, *a, **kw):
        pass

    def chat_completion(self, messages):
        return {"choices": [{"message": {"content": "ai"}}]}


def test_upload_and_attach_file(tmp_path, monkeypatch):
    files_api._service = FileService(upload_dir=tmp_path)
    monkeypatch.setattr(messages_api, "OpenAIService", DummyAI)
    messages_api._openai_service = None

    client = TestClient(app)

    chat_id = client.post("/chats/", json={"title": "filechat"}).json()["id"]

    file_path = tmp_path / "t.txt"
    file_path.write_text("hello")
    with file_path.open("rb") as f:
        resp = client.post("/files/", files={"file": ("t.txt", f, "text/plain")})
    assert resp.status_code == 201
    filename = resp.json()["filename"]

    # file exists
    service = files_api._service
    assert service.get_file_path(filename).exists()

    msg_resp = client.post(
        "/messages/",
        json={
            "chat_id": chat_id,
            "content": "hi",
            "file": {"filename": filename, "content_type": "text/plain"},
        },
    )
    assert msg_resp.status_code == 201

    msgs = client.get(f"/messages/{chat_id}").json()
    assert len(msgs) == 2
    assert msgs[0]["file"]["filename"] == filename
    assert msgs[1]["role"] == "assistant"
