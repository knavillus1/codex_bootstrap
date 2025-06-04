#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | xargs)
fi

python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

pushd backend >/dev/null
uvicorn backend.main:app --reload &
BACKEND_PID=$!
popd >/dev/null

pushd frontend >/dev/null
npm install
npm run dev &
FRONTEND_PID=$!
popd >/dev/null

sleep 2

wait $BACKEND_PID $FRONTEND_PID
