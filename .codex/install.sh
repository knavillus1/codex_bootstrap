#!/usr/bin/env bash
set -euo pipefail
pip install -r backend/requirements.txt
# PostgreSQL may be required for local development
command -v psql >/dev/null 2>&1 || echo "PostgreSQL not installed; install it if database access is needed"
cd frontend
npm install
cd ..
