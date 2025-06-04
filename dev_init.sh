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

# Ensure PostgreSQL is running
if command -v brew >/dev/null && brew services list | grep -q postgresql; then
  brew services start postgresql >/dev/null
fi

# Wait for Postgres to accept connections
if command -v pg_isready >/dev/null; then
  until pg_isready >/dev/null 2>&1; do
    sleep 1
  done
fi

# Apply database migrations
alembic -c backend/alembic.ini upgrade head

# Start backend
(cd backend && uvicorn app.main:app --reload --port 8000) &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to start..."
until curl -s http://localhost:8000/health > /dev/null 2>&1; do
  sleep 1
done
echo "Backend is ready!"

# Start frontend
(cd frontend && npm install && npm run dev) &
FRONTEND_PID=$!

trap 'kill $BACKEND_PID $FRONTEND_PID' EXIT
wait
