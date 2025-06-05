# Proxy module for api.messages -> backend.api.messages
import sys
import backend.api.messages as _orig
# Expose attributes of original module
for attr in dir(_orig):
    if not attr.startswith("__"):
        globals()[attr] = getattr(_orig, attr)
# Ensure imports of api.messages resolve to backend.api.messages
sys.modules['api.messages'] = _orig
