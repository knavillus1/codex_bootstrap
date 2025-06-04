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
3. Start the Vite dev server (configured to proxy `/api` requests to the
   backend running on port `8000`):
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

### Database Setup
1. Install and start PostgreSQL as described in
   `.project-management/current-prd/prd-background/postgres-docs.md`.
2. Create the development database and apply migrations:
   ```bash
   createdb pac_invaders
   alembic -c backend/alembic.ini upgrade head
   ```

### Combined development
Run `./dev_init.sh` to start both servers concurrently. The script ensures
PostgreSQL is running, applies Alembic migrations and then launches the
backend and frontend.

