from fastapi.testclient import TestClient
from backend.main import app
import time


def test_chat_crud():
    client = TestClient(app)
    res1 = client.post("/chats/", json={"title": "First"})
    assert res1.status_code == 201
    id1 = res1.json()["id"]
    time.sleep(0.01)
    res2 = client.post("/chats/", json={"title": "Second"})
    assert res2.status_code == 201
    id2 = res2.json()["id"]

    list_resp = client.get("/chats/")
    assert list_resp.status_code == 200
    ids = [c["id"] for c in list_resp.json()]
    assert ids[0] == id2
    assert ids[1] == id1

    get_resp = client.get(f"/chats/{id1}")
    assert get_resp.status_code == 200
    data = get_resp.json()
    assert data["title"] == "First"
    assert data["message_count"] == 0

    del_resp = client.delete(f"/chats/{id1}")
    assert del_resp.status_code == 204

    missing = client.get(f"/chats/{id1}")
    assert missing.status_code == 404


def test_create_auto_title():
    client = TestClient(app)
    resp = client.post("/chats/", json={})
    assert resp.status_code == 201
    assert resp.json()["title"].startswith("Chat ")
