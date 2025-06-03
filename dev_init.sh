#!/usr/bin/env bash
set -euo pipefail

# Load environment variables if present
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

# Kill any running dev servers
pkill -f uvicorn 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Python virtual environment
if [ ! -d .venv ]; then
  python3 -m venv .venv
fi
source .venv/bin/activate
pip install -r backend/requirements.txt

# Start backend
uvicorn backend.app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Start frontend
pushd frontend >/dev/null
npm install
npm run dev &
FRONTEND_PID=$!
popd >/dev/null

trap 'kill $BACKEND_PID $FRONTEND_PID' EXIT
wait
