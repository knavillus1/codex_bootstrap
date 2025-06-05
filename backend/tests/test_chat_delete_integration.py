from fastapi.testclient import TestClient
from backend.main import app
from pathlib import Path
import api.chat as chat_api


def test_delete_chat_removes_file(tmp_path, monkeypatch):
    # ensure storage uses temporary directory
    monkeypatch.setenv('TEST_DATA_DIR', str(tmp_path))
    chat_api._storage = None

    client = TestClient(app)

    chat_id = client.post('/chats/', json={'title': 'temp'}).json()['id']
    chat_file = Path(tmp_path) / f"{chat_id}.json"
    assert chat_file.exists()

    resp = client.delete(f'/chats/{chat_id}')
    assert resp.status_code == 204

    assert not chat_file.exists()
    list_ids = [c['id'] for c in client.get('/chats/').json()]
    assert chat_id not in list_ids
