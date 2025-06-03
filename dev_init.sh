#!/usr/bin/env bash
set -euo pipefail

# Development helper script to start the application.

# Export optional debug environment variables if provided
# Example CORS allowed origins for the backend (comma-separated)
#: "${ALLOW_ORIGINS:=http://localhost:5173}"
#export ALLOW_ORIGINS

# Kill existing processes
trap '[[ -n ${BACKEND_PID:-} ]] && kill $BACKEND_PID; [[ -n ${FRONTEND_PID:-} ]] && kill $FRONTEND_PID' EXIT

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start backend in background if main.py exists
if [ -f backend/main.py ]; then
  uvicorn backend.main:app --reload &
  BACKEND_PID=$!
fi

# Start frontend in background
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to exit (usually via CTRL+C)
wait $FRONTEND_PID
