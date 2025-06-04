### Notes on local development setup.  

## Local Development
This section describes development environment setup and is maintained by the codex agent


### Frontend

The frontend is a Vite + React application. The main entry point is
`frontend/src/main.tsx` and the HTML template is `frontend/index.html`.
Global styles live in `frontend/src/styles/globals.css` and Tailwind CSS
configuration is defined in `frontend/tailwind.config.js`.


### Backend

### Getting Started

1. Copy `.env.template` to `.env` and fill in the required values.
2. Run `./dev_init.sh` to create a virtual environment, install dependencies, and start both backend and frontend servers.
3. Access the frontend at `http://localhost:5173` and the API at `http://localhost:8000`.

