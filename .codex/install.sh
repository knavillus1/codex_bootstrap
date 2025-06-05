#!/usr/bin/env bash
set -euo pipefail

echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "Installing Node.js dependencies..."
cd frontend

# Ensure we have a clean node_modules if package-lock.json exists
if [ -f package-lock.json ]; then
  echo "Using npm ci for clean install..."
  npm ci
else
  echo "Using npm install..."
  npm install
fi

# Verify key dependencies are installed
if ! npm list jsdom >/dev/null 2>&1; then
  echo "jsdom not found, installing explicitly..."
  npm install jsdom --save-dev
fi

if ! npm list vitest >/dev/null 2>&1; then
  echo "vitest not found, installing explicitly..."
  npm install vitest --save-dev
fi

cd ..
echo "Installation complete!"
