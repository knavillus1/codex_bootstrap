from fastapi.testclient import TestClient
from backend.main import app


client = TestClient(app)


def test_register_and_login():
    resp = client.post("/register", json={"username": "alice", "password": "secret"})
    assert resp.status_code == 200
    resp = client.post("/login", json={"username": "alice", "password": "secret"})
    assert resp.status_code == 200
    assert resp.cookies.get("session_token") is not None
