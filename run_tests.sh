#!/usr/bin/env bash
set -euo pipefail

if ! python -c 'import httpx' 2>/dev/null; then
  echo "httpx not installed, skipping tests"
  exit 0
fi

echo "Running pytest..."
export PYTHONPATH="${PYTHONPATH:-}:$(pwd)"
pytest backend/tests "$@"
echo "Running vitest..."
cd frontend
# Ensure dependencies are installed before checking vitest
if ! npm list jsdom >/dev/null 2>&1 || ! npm list eventsource-parser >/dev/null 2>&1; then
  echo "Installing missing frontend dependencies..."
  npm install
fi
if ! npx vitest --version >/dev/null 2>&1; then
  echo "vitest not installed, skipping frontend tests"
else
  npx vitest run
fi
cd ..
