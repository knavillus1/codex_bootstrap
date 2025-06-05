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
    # file should be saved inside a dated subdirectory (YYYY/MM/DD)
    rel_parts = dest.relative_to(tmp_path).parts
    assert len(rel_parts) == 4  # yyyy/mm/dd/filename
