"""Shared test configuration and fixtures."""

import os
import pytest
import tempfile
from pathlib import Path


@pytest.fixture(autouse=True)
def isolated_storage():
    """Automatically isolate storage for all tests using environment variable."""
    # Create temporary directory for test data
    with tempfile.TemporaryDirectory() as tmp_dir:
        # Set environment variable to redirect all storage to temp directory
        original_test_data_dir = os.environ.get('TEST_DATA_DIR')
        os.environ['TEST_DATA_DIR'] = str(tmp_dir)
        
        # Clear any cached storage instances
        import api.chat
        import api.messages
        api.chat._storage = None
        api.messages._storage = None
        
        try:
            yield Path(tmp_dir)
        finally:
            # Restore original environment
            if original_test_data_dir is not None:
                os.environ['TEST_DATA_DIR'] = original_test_data_dir
            else:
                os.environ.pop('TEST_DATA_DIR', None)
            
            # Clear cached storage instances again
            api.chat._storage = None
            api.messages._storage = None
