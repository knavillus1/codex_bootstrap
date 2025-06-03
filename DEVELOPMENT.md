### Notes on local development setup.  

## Local Development
This section describes development environment setup and is maintained by the codex agent


### Frontend
1. Ensure Node.js is installed
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

### Backend
1. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Copy `.env.template` to `.env` and update database settings.
4. Start the API server:
   ```bash
   uvicorn backend.app.main:app --reload
   ```

### Combined development
Run `./dev_init.sh` to start both servers concurrently.

