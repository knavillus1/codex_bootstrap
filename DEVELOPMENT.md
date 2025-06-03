### Notes on local development setup.  

## Local Development
This section describes development environment setup and is maintained by the codex agent


### Frontend


### Backend

1. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Start the FastAPI application:
   ```bash
   uvicorn backend.main:app --reload
   ```

