from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_add_and_get_scores():
    post_resp = client.post("/api/scores", params={"initials": "ABC", "score": 100})
    assert post_resp.status_code == 200
    data = post_resp.json()
    assert data["initials"] == "ABC"
    assert data["score"] == 100

    get_resp = client.get("/api/scores")
    assert get_resp.status_code == 200
    scores = get_resp.json()
    assert any(s["initials"] == "ABC" and s["score"] == 100 for s in scores)
