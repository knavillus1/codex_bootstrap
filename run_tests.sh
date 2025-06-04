#!/usr/bin/env bash
set -euo pipefail

if ! python -c 'import httpx' 2>/dev/null; then
  echo "httpx not installed, skipping tests"
  exit 0
fi

echo "Running pytest..."
export PYTHONPATH="${PYTHONPATH:-}:$(pwd)"
export OPENAI_API_KEY="test-key"
pytest backend/tests "$@"
