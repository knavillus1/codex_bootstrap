#!/usr/bin/env bash
set -euo pipefail


pip install -r requirements.txt
cd frontend
npm install
cd ..
