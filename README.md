# codex-bootstrap

codex-bootstrap is a starter template for a full-stack web application integrating a Python FastAPI backend with a React Vite frontend, with Codex agent task support.

## Features

- PRD and Task file creation within Codex via local IDE agent
- Task orchestration and managment in Codex or local IDE agent
- Automatic creation and maintenance of local dev setup and application start up script
- Backend: Python 3, FastAPI, Uvicorn
- Frontend: React 18, Vite, Tailwind CSS, React Router
- Pre-configured linting and testing scripts

## PRD file creation

- Add a .md file describing the feature in as much or little detail to `.project-management/prd-background`
- if relevant, add design mockup file
- Start Codex task in Code mode with just the phrase *CreatePrd*
- *Alternatively can be run with local cursor/github copilot agent mode etc.. with reasoning model for better results.  Give focus to `create-prd.md` file and send 'go' message*
- There will be Q&A with the Agent, answer and click Code (Environment is spun up againP)
- Result should be a PRD file in `.project-management/tasks/`
- Merge PR to target branch

## Task list file creation

- Start Codex task in Code mode with just the phrase *CreateTasks*
- *Alternatively can be run with local cursor/github copilot agent mode etc.. with reasoning model for better results.  Give focus to `generate-tasks.md` file and send 'go' message*
- Q&A, answer and click code
- Result should be a task list file in `.project-management/tasks/`, with a copy named `current-tasks.md`
- Merge PR to target branch

## TaskMaster

- Once `.project-management/tasks/current-tasks.md` is created, the TaskMaster message can be used.  This will allow the agent to commit to one or more tasks in a session.  The task list file will be updated as part of the PR, with completed tasks checked off and relevant files updated as needed.
- Start Codex in Code mode using the phrase *TaskMaster*.  This will corece the agent to reference `process-tasks-cloud.md' which picks one or more tasks to complete in the session.
- *Alternatively, tasks can be executed by local agent with focus on `process-tasks-local.md' which will run one task at a time*

## Project Structure

- `AGENTS.md`: Instructions for Codex agents
*These files are under control and watch by the Codex agent and will be updated as project tasks demand.*
- `CHANGELOG.md`: Project change history
- `DEVELOPMENT.md`: Developer setup and local testing instructions
- `README.md`: Project overview and file descriptions
- `dev_init.sh`: Script to initialize development environment and start services
- `.codex/install.sh`: Codex Environment Setup script for dependencies and environment
- `run_tests.sh`: Initial script to run tests across backend and frontend
- `backend/requirements.txt`: Python dependencies with initial common pacakges
- `frontend/`
    - `package.json`: npm dependencies and scripts for frontend
    - `eslint.config.js`: ESLint configuration(e.g., .NET)
- `.flake8` python flake8 configuration for linting

*Project managment instruction prompts derived from [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) under Apache License 2.0*
- `.project-management/` 
    - `create-prd.md`: Instructions and rules for generating a Product Requirements Document (PRD) via AI, including clarifying questions and output location.
    - `generate-tasks.md`: Instructions for generating a step-by-step task list from a PRD, including process and file naming conventions.
    - `process-tasks-cloud.md`: TaskMaster module rules for managing and marking tasks as committed or completed in a cloud workflow.
    - `process-tasks-local.md`: TaskMaster module rules for local task management, including sub-task completion protocol and user confirmation steps.
    - `close-prd.md`: Instructions and rules for generating a final PRD feature review, to either provide final cleanup or closeout.
    - `prd-background/`: Feature background and html design mockups for current feature
        - `archive-prd/`: Archived PRDs and Task lists
        - `close-prd/`: Closed PRDs and Task lists, but reviewed during subsequent PRD creation to provide previously completed dev context
        - `current-prd/`: Current PRD and Task list for the feature under active development
            - `prd-background/`: feature background `design-mock.html`, `api-document.md` etc... If using Codex-cloud PRD creation, feature specification should be found at `feature-specification.md`

## Target Technologies

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
