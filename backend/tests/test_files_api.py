from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_upload_file_not_implemented():
    response = client.post('/files/')
    assert response.status_code == 501
    assert response.json()['detail'] == 'Not implemented'
