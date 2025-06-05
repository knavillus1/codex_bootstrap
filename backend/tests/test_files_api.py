from fastapi.testclient import TestClient
from backend.main import app
from backend.services.file_service import FileService

client = TestClient(app)


def test_upload_file_success(tmp_path):
    file_path = tmp_path / "test.txt"
    file_path.write_text("hello")
    with file_path.open("rb") as f:
        response = client.post(
            "/files/",
            files={"file": (file_path.name, f, "text/plain")},
        )
    assert response.status_code == 201
    data = response.json()
    assert "filename" in data


def test_upload_file_invalid_type(tmp_path):
    bad_path = tmp_path / "malware.exe"
    bad_path.write_text("bad")
    with bad_path.open("rb") as f:
        response = client.post(
            "/files/",
            files={"file": (bad_path.name, f, "application/octet-stream")},
        )
    assert response.status_code == 400
    assert "Unsupported file type" in response.json()["detail"]


def test_upload_file_too_large(tmp_path, monkeypatch):
    import api.files as files_api
    files_api._service = FileService(upload_dir=tmp_path, max_size=5)

    big_path = tmp_path / "big.txt"
    big_path.write_bytes(b"0123456789")
    with big_path.open("rb") as f:
        response = client.post(
            "/files/",
            files={"file": (big_path.name, f, "text/plain")},
        )
    assert response.status_code == 400
    assert "File too large" in response.json()["detail"]
