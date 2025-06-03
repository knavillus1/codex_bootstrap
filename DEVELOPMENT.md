### Notes on local development setup.  

## Local Development
This section describes development environment setup and is maintained by the codex agent


### Frontend

Run the Vite development server:

```bash
cd frontend
npm run dev
```

### Backend

Activate the development environment and run the backend server:

```bash
source venv/bin/activate
uvicorn backend.main:app --reload
```

To start both backend and frontend together, run:

```bash
./dev_init.sh
```

