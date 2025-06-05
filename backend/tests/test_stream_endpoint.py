from backend.main import app
from backend.api import stream as stream_api
from fastapi.testclient import TestClient


class DummyAI:
    def __init__(self, *a, **kw):
        pass

    async def chat_completion_stream(self, messages):
        for i in range(2):
            yield {"delta": str(i)}


def test_stream_endpoint(monkeypatch):
    monkeypatch.setattr(stream_api, "OpenAIService", lambda *a, **kw: DummyAI())
    stream_api._openai_service = None
    monkeypatch.setattr(stream_api.settings, "FEATURE_STREAMING", True, raising=False)
    app.include_router(stream_api.router)

    client = TestClient(app)
    chat_id = client.post("/chats/", json={"title": "chat"}).json()["id"]

    resp = client.post("/stream/", json={"chat_id": chat_id, "content": "hi"})
    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("text/event-stream")
    body = resp.text
    assert "[DONE]" in body
