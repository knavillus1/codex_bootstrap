# codex-bootstrap

codex-bootstrap is a starter template for a full-stack web application integrating a Python FastAPI backend with a React Vite frontend, with Codex agent task support.

## Features

- Backend: Python 3, FastAPI, Uvicorn
- Frontend: React 18, Vite, Tailwind CSS, React Router
- Codex agent task orchestrations
- Pre-configured linting and testing scripts

## Project Structure

- AGENTS.md: Instructions for Codex agents and contributor guide
# These files are under control and watch by the Codex agent and will be updated as project tasks demand.
- CHANGELOG.md: Project change history
- DEVELOPMENT.md: Developer setup and local testing instructions
- README.md: Project overview and file descriptions
- dev_init.sh: Script to initialize development environment and start services
- install.sh: Codex Environment Setup script for dependencies and environment
- run_tests.sh: Initial script to run tests across backend and frontend
- requirements.txt: Python dependencies with initial common pacakges
- frontend/
    - package.json: npm dependencies and scripts for frontend
    - eslint.config.js: ESLint configuration(e.g., .NET)
- .flake8 python flake8 configuration for linting
## Technologies Used

- Python 3.x
- FastAPI
- Uvicorn
- React 18
- Vite
- Tailwind CSS
- React Router

## Codex Environment Setup
Go to https://chatgpt.com/codex/settings/environments, select or create your github-connected environment then Edit -> Advanced and copy-paste install.sh into the startup script textbox. Save
*End of document*
