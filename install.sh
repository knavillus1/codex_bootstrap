#!/usr/bin/env bash
set -euo pipefail
pip install -r backend/requirements.txt
cd frontend
npm install
cd ..
