#!/usr/bin/env python3
"""
Simple verification script for the file storage system implementation.
This script checks the current state and runs key tests.
"""

import subprocess
import sys
from pathlib import Path


def run_command(cmd: str, description: str) -> tuple[bool, str]:
    """Run a command and return success status and output."""
    print(f"🔍 {description}")
    try:
        result = subprocess.run(
            cmd, 
            shell=True, 
            capture_output=True, 
            text=True, 
            cwd=Path(__file__).parent
        )
        success = result.returncode == 0
        output = result.stdout + result.stderr
        return success, output
    except Exception as e:
        return False, str(e)


def verify_file_storage():
    """Verify the file storage system implementation."""
    print("🔍 File Storage System Verification")
    print("=" * 50)
    
    # Check if key files exist
    backend_path = Path(__file__).parent / "backend"
    key_files = [
        "services/file_service.py",
        "api/files.py", 
        "tests/test_file_service.py",
        "tests/test_files_api.py"
    ]
    
    print("📁 Checking key implementation files:")
    for file_path in key_files:
        full_path = backend_path / file_path
        if full_path.exists():
            print(f"   ✅ {file_path}")
        else:
            print(f"   ❌ {file_path} - MISSING")
    print()
    
    # Check current directory structure
    print("📂 Current Backend Directory Structure:")
    uploads_dir = backend_path / "uploads"
    data_dir = backend_path / "data"
    
    if uploads_dir.exists():
        print(f"   ✅ uploads/ directory exists")
        upload_files = list(uploads_dir.glob("*"))
        if upload_files:
            print(f"      Contains {len(upload_files)} file(s):")
            for f in upload_files:
                print(f"      - {f.name}")
        else:
            print("      (empty)")
    else:
        print(f"   📁 uploads/ directory will be created on first upload")
    
    if data_dir.exists():
        print(f"   ✅ data/ directory exists")
        data_files = list(data_dir.glob("*.json"))
        if data_files:
            print(f"      Contains {len(data_files)} chat file(s)")
        else:
            print("      (no chat files yet)")
    else:
        print(f"   📁 data/ directory will be created on first chat")
    print()
    
    # Run specific file storage tests
    print("🧪 Running File Storage Tests:")
    
    test_commands = [
        ("python -m pytest backend/tests/test_file_service.py -v", "File Service Tests"),
        ("python -m pytest backend/tests/test_files_api.py -v", "File API Tests"),
    ]
    
    all_passed = True
    for cmd, desc in test_commands:
        success, output = run_command(cmd, desc)
        if success:
            print(f"   ✅ {desc} - PASSED")
            # Show test details
            lines = output.split('\n')
            for line in lines:
                if '::test_' in line and ('PASSED' in line or 'FAILED' in line):
                    test_name = line.split('::')[-1].split()[0]
                    status = "✅" if "PASSED" in line else "❌"
                    print(f"      {status} {test_name}")
        else:
            print(f"   ❌ {desc} - FAILED")
            all_passed = False
            # Show first few lines of error
            lines = output.split('\n')[:10]
            for line in lines:
                if line.strip():
                    print(f"      {line}")
        print()
    
    # Show key features from code analysis
    print("🔧 Key Features Implemented (from code analysis):")
    
    file_service_path = backend_path / "services/file_service.py"
    if file_service_path.exists():
        content = file_service_path.read_text()
        
        features = [
            ("organized directory structure", "datetime.utcnow()" in content and "dest_dir" in content),
            ("file type validation", "_validate_extension" in content),
            ("file size limits", "max_size" in content),
            ("unique filename generation", "uuid4().hex" in content),
            ("automatic directory creation", "mkdir(parents=True" in content),
        ]
        
        for feature, implemented in features:
            status = "✅" if implemented else "❌"
            print(f"   {status} {feature}")
    print()
    
    # Summary
    if all_passed:
        print("🎉 File Storage System Verification: SUCCESS!")
        print("   All tests pass and key features are implemented.")
    else:
        print("⚠️  File Storage System Verification: ISSUES FOUND")
        print("   Some tests failed. Check the output above for details.")
    
    print(f"\n📖 To manually test the system:")
    print(f"   1. Start the backend: cd backend && python main.py")
    print(f"   2. Use curl or Postman to upload files to POST /files/")
    print(f"   3. Check the uploads/ directory for organized storage")


if __name__ == "__main__":
    verify_file_storage()
