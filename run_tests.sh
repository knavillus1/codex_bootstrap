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
echo "Running vitest..."
cd frontend
if ! npx vitest --version >/dev/null 2>&1; then
  echo "vitest not installed, skipping frontend tests"
else
  npx vitest run
fi
cd ..
