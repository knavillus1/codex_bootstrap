#!/usr/bin/env bash
set -euo pipefail

# NOTE TO Codex agent: If you are reading this, it means you are bootstraping a new project.
# It is your responsibility to fill in the missing parts of this script, the headings below
# are just a guide to help you with common development application startup tasks.
# Remove these comments and complete the script as needed.



# Export optional debug environment variables if provided

# Example CORS allowed origins for the backend (comma-separated)
: "${ALLOW_ORIGINS:=http://localhost:5173}"
export ALLOW_ORIGINS

# Kill existing processes
pkill -f uvicorn 2>/dev/null || true

# Create virtual environment if it doesn't exist
if [ ! -d venv ]; then
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install  dependencies
pip install -r backend/requirements.txt

# Start backend in background
uvicorn backend.main:app --reload &

# Start frontend in background

# Wait briefly for servers to start

# Open in default browser (macOS or Linux)

#  Wait for servers to shut down manually