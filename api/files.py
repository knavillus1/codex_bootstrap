# Proxy module for api.files -> backend.api.files
import sys
import backend.api.files as _orig
# Expose attributes of original module
for attr in dir(_orig):
    if not attr.startswith("__"):
        globals()[attr] = getattr(_orig, attr)
# Ensure imports of api.files resolve to backend.api.files
sys.modules['api.files'] = _orig
