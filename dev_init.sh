#!/usr/bin/env bash
set -euo pipefail

# Development environment startup script

# Export optional debug environment variables if provided
: "${ALLOW_ORIGINS:=http://localhost:5173}"
export ALLOW_ORIGINS

# Kill existing processes
pkill -f uvicorn 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start backend in background
uvicorn backend.main:app --reload &
BACKEND_PID=$!

# Start frontend in background
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait briefly for servers to start
sleep 2

echo "Backend running at http://localhost:8000"
echo "Frontend running at http://localhost:5173"

# Wait for servers to shut down manually
wait $BACKEND_PID $FRONTEND_PID
