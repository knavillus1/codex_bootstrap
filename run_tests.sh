#!/usr/bin/env bash
set -euo pipefail

if ! python -c 'import httpx, sqlalchemy' 2>/dev/null; then
  echo "Required test dependencies not installed, skipping tests"
  exit 0
fi

echo "Running pytest..."
export PYTHONPATH="${PYTHONPATH:-}:$(pwd)"
pytest backend/tests "$@"
