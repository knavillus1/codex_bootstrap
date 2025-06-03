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

# Default database URL (Postgres) if not provided
: "${DATABASE_URL:=postgresql+asyncpg://postgres:postgres@localhost:5432/postgres}"
export DATABASE_URL

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

# Start local Postgres via Docker if not already running
if ! nc -z localhost 5432; then
  if command -v docker >/dev/null; then
    echo "Starting local Postgres container..."
    docker run --rm --name codex_bootstrap_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres
    # wait until Postgres port is open
    until nc -z localhost 5432; do sleep 1; done
  else
    echo "ERROR: Postgres not reachable and Docker not installed. Please start Postgres or install Docker."
    exit 1
  fi
fi

# Start backend in background
uvicorn backend.main:app --reload &

# Start frontend in background
npm --prefix frontend install >/dev/null
npm --prefix frontend run dev &

# Wait briefly for servers to start
sleep 2

# Open in default browser
case "$(uname)" in
  Darwin*) open http://localhost:5173;;
  Linux*) xdg-open http://localhost:5173;;
esac

# Wait for servers to shut down manually
wait
