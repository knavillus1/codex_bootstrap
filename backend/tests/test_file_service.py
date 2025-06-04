from io import BytesIO
from pathlib import Path

from fastapi import UploadFile

from backend.services.file_service import FileService


def test_save_upload(tmp_path: Path) -> None:
    service = FileService(
        upload_dir=tmp_path,
        allowed_extensions=[".txt"],
        max_size=100,
    )
    upload = UploadFile(filename="test.txt", file=BytesIO(b"hello"))
    dest = service.save_upload(upload)
    assert dest.exists()
    assert dest.read_bytes() == b"hello"
