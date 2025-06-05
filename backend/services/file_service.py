from __future__ import annotations

from pathlib import Path
from typing import Iterable
from datetime import datetime
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
        now = datetime.utcnow()
        dest_dir = self.upload_dir / f"{now:%Y/%m/%d}"
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / file_id
        dest.write_bytes(data)
        upload.file.seek(0)
        return dest

    def get_file_path(self, filename: str) -> Path:
        """Find an uploaded file by filename across all date directories."""
        # First try the direct path (legacy files)
        direct_path = self.upload_dir / filename
        if direct_path.exists():
            return direct_path

        # Search in date-organized directories
        for year_dir in self.upload_dir.iterdir():
            if year_dir.is_dir() and year_dir.name.isdigit():
                for month_dir in year_dir.iterdir():
                    if month_dir.is_dir() and month_dir.name.isdigit():
                        for day_dir in month_dir.iterdir():
                            if day_dir.is_dir() and day_dir.name.isdigit():
                                file_path = day_dir / filename
                                if file_path.exists():
                                    return file_path

        # Return the expected path even if it doesn't exist (for 404 handling)
        return self.upload_dir / filename
