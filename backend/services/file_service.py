from __future__ import annotations

from pathlib import Path
from typing import Iterable
from uuid import uuid4

from fastapi import UploadFile


class FileService:
    """Handle basic upload validation and storage."""

    def __init__(
        self,
        upload_dir: Path | None = None,
        allowed_extensions: Iterable[str] | None = None,
        max_size: int = 5 * 1024 * 1024,
    ) -> None:
        base = Path(__file__).resolve().parent.parent
        self.upload_dir = upload_dir or base / "uploads"
        self.upload_dir.mkdir(parents=True, exist_ok=True)
        allowed = allowed_extensions or ["txt", "png", "jpg", "jpeg", "pdf"]
        self.allowed_extensions = {
            ext.lower() if ext.startswith(".") else f".{ext.lower()}"
            for ext in allowed
        }
        self.max_size = max_size

    def _validate_extension(self, filename: str) -> None:
        suffix = Path(filename).suffix.lower()
        if suffix not in self.allowed_extensions:
            raise ValueError("Unsupported file type")

    def save_upload(self, upload: UploadFile) -> Path:
        """Validate and save an uploaded file."""
        self._validate_extension(upload.filename)
        data = upload.file.read()
        if len(data) > self.max_size:
            raise ValueError("File too large")
        file_id = uuid4().hex + Path(upload.filename).suffix
        dest = self.upload_dir / file_id
        dest.write_bytes(data)
        upload.file.seek(0)
        return dest
