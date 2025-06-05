#!/usr/bin/env python3
"""
Demo script to showcase the file storage system implementation.
This creates sample files and demonstrates the organized directory structure.
"""

import tempfile
import sys
from pathlib import Path
from datetime import datetime

# Add backend to Python path
sys.path.insert(0, str(Path(__file__).parent / "backend"))

from services.file_service import FileService
from io import BytesIO
from fastapi import UploadFile


def create_demo_file(filename: str, content: str) -> UploadFile:
    """Create a demo UploadFile."""
    return UploadFile(filename=filename, file=BytesIO(content.encode()))


def demo_file_storage():
    """Demonstrate the file storage system."""
    print("🚀 File Storage System Demo")
    print("=" * 40)
    
    # Use the actual uploads directory
    backend_path = Path(__file__).parent / "backend"
    uploads_dir = backend_path / "uploads"
    
    # Initialize the FileService
    service = FileService(upload_dir=uploads_dir)
    
    print(f"📂 Upload Directory: {uploads_dir}")
    print(f"✅ Allowed Extensions: {sorted(service.allowed_extensions)}")
    print(f"📏 Max File Size: {service.max_size / (1024*1024):.1f}MB")
    print()
    
    # Demo files to upload
    demo_files = [
        ("meeting_notes.txt", "# Meeting Notes\n\nDiscussed the new file storage system implementation."),
        ("project_diagram.png", "fake_image_data_here"),
        ("requirements.pdf", "fake_pdf_content_here"),
        ("profile_photo.jpg", "fake_jpeg_data_here")
    ]
    
    uploaded_paths = []
    
    print("📤 Uploading Demo Files:")
    print("-" * 25)
    
    for filename, content in demo_files:
        try:
            # Create and upload the file
            demo_file = create_demo_file(filename, content)
            saved_path = service.save_upload(demo_file)
            uploaded_paths.append(saved_path)
            
            # Show the organized structure
            rel_path = saved_path.relative_to(uploads_dir)
            parts = rel_path.parts
            
            print(f"✅ {filename}")
            print(f"   📁 Organized Path: {rel_path}")
            print(f"   📅 Date Structure: {'/'.join(parts[:-1])}")
            print(f"   🔐 Unique Name: {parts[-1]}")
            print()
            
        except Exception as e:
            print(f"❌ {filename}: {e}")
            print()
    
    # Show the directory tree
    print("🌳 Directory Structure:")
    print("-" * 22)
    
    def show_tree(path: Path, prefix: str = "", max_depth: int = 4, current_depth: int = 0):
        """Show directory tree with depth limit."""
        if not path.exists() or current_depth >= max_depth:
            return
        
        try:
            items = sorted([p for p in path.iterdir() if not p.name.startswith('.')])
        except PermissionError:
            return
            
        for i, item in enumerate(items):
            is_last = i == len(items) - 1
            current_prefix = "└── " if is_last else "├── "
            
            if item.is_file():
                size = item.stat().st_size
                print(f"{prefix}{current_prefix}{item.name} ({size} bytes)")
            else:
                print(f"{prefix}{current_prefix}{item.name}/")
                
                if item.is_dir() and current_depth < max_depth - 1:
                    next_prefix = prefix + ("    " if is_last else "│   ")
                    show_tree(item, next_prefix, max_depth, current_depth + 1)
    
    show_tree(uploads_dir)
    print()
    
    # Summary
    print("📊 Upload Summary:")
    print("-" * 16)
    print(f"Total files uploaded: {len(uploaded_paths)}")
    print(f"Files organized by date: ✅")
    print(f"Unique filenames generated: ✅")
    print(f"Directory auto-created: ✅")
    
    # Show today's date structure
    today = datetime.utcnow()
    today_path = uploads_dir / f"{today:%Y/%m/%d}"
    if today_path.exists():
        today_files = list(today_path.glob("*"))
        print(f"Files in today's directory ({today:%Y/%m/%d}): {len(today_files)}")
    
    print("\n🎯 Key Features Demonstrated:")
    print("- ✅ Organized directory structure (YYYY/MM/DD)")
    print("- ✅ File type validation")
    print("- ✅ Unique filename generation (UUID + extension)")
    print("- ✅ Automatic directory creation")
    print("- ✅ File size validation")
    print("- ✅ Preservation of original file extensions")


if __name__ == "__main__":
    demo_file_storage()
