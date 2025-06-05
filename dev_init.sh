#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | xargs)
fi

# Enable streaming feature by default if not set
export FEATURE_STREAMING=${FEATURE_STREAMING:-true}

python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

pushd backend >/dev/null
# Ensure backend is importable as a package
export PYTHONPATH="$(dirname "$PWD"):${PYTHONPATH:-}"
uvicorn main:app --host "${HOST:-0.0.0.0}" --port "${PORT:-8000}" --reload &
BACKEND_PID=$!
popd >/dev/null

pushd frontend >/dev/null
# Ensure all dependencies are properly installed
npm install
npm run dev &
FRONTEND_PID=$!
popd >/dev/null

sleep 2

wait $BACKEND_PID $FRONTEND_PID
