from fastapi.testclient import TestClient
from backend.main import app


def test_root_endpoint_with_cors():
    client = TestClient(app)
    response = client.get("/", headers={"Origin": "http://example.com"})
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    allowed = response.headers.get("access-control-allow-origin")
    assert allowed in {"*", "http://example.com"}
