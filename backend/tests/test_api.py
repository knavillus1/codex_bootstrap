from fastapi.testclient import TestClient
from backend.main import app


def test_simulation_endpoints():
    client = TestClient(app)

    params = {"algae": 1, "herbivores": 0, "carnivores": 0}
    resp = client.post("/simulation/reset", params=params)
    assert resp.status_code == 200
    assert resp.json()["organisms"] == 1

    resp = client.post("/simulation/step")
    assert resp.status_code == 200
    assert resp.json()["step"] == 1

    resp = client.get("/simulation/state")
    assert resp.status_code == 200
    state = resp.json()
    assert state["step"] == 1
    assert len(state["organisms"]) >= 1

    resp = client.get("/simulation/stats")
    assert resp.status_code == 200
    stats = resp.json()
    assert stats["step"] == 1
    assert stats["counts"]["algae"] >= 1
