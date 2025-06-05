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
    assert "data_uri" not in msgs[0]["file"] or msgs[0]["file"]["data_uri"] is None
    assert msgs[1]["role"] == "assistant"


def test_image_base64(tmp_path, monkeypatch):
    files_api._service = FileService(upload_dir=tmp_path)
    monkeypatch.setattr(messages_api, "OpenAIService", DummyAI)
    messages_api._openai_service = None

    client = TestClient(app)

    chat_id = client.post("/chats/", json={"title": "img"}).json()["id"]

    import base64

    img_b64 = (
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8"
        "AAwMCAO8B9FYAAAAASUVORK5CYII="
    )
    file_path = tmp_path / "i.png"
    file_path.write_bytes(base64.b64decode(img_b64))
    with file_path.open("rb") as f:
        resp = client.post("/files/", files={"file": ("i.png", f, "image/png")})
    assert resp.status_code == 201
    filename = resp.json()["filename"]

    msg_resp = client.post(
        "/messages/",
        json={
            "chat_id": chat_id,
            "content": "see",
            "file": {"filename": filename, "content_type": "image/png"},
        },
    )
    assert msg_resp.status_code == 201

    msgs = client.get(f"/messages/{chat_id}").json()
    assert msgs[0]["file"]["filename"] == filename
    assert msgs[0]["file"]["data_uri"].startswith("data:image/png;base64,")
