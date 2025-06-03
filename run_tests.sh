#!/usr/bin/env bash
set -euo pipefail

missing_modules=$(python - <<'PY'
import importlib.util
mods = ["httpx", "sqlalchemy"]
missing = [m for m in mods if importlib.util.find_spec(m) is None]
print(' '.join(missing))
PY
)
if [ -n "$missing_modules" ]; then
  echo "$missing_modules not installed, skipping tests"
  exit 0
fi

echo "Running pytest..."
export PYTHONPATH="${PYTHONPATH:-}:$(pwd)"
pytest backend/tests "$@"
