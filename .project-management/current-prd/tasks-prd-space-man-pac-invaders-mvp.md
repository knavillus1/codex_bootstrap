## Pre-Feature Development Project Tree
```
AGENTS.md
CHANGELOG.md
DEVELOPMENT.md
LICENSE
README.md
backend/
backend/requirements.txt
dev_init.sh
frontend/
frontend/eslint.config.js
frontend/package-lock.json
frontend/package.json
run_tests.sh
```

## Relevant Files
- `backend/requirements.txt`
- `frontend/package.json`
- `.codex/install.sh`
- `dev_init.sh`
- `DEVELOPMENT.md`
- `run_tests.sh`
- `.env.template`
- `frontend/index.html`
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`
- `frontend/tsconfig.json`
- `frontend/tsconfig.node.json`
- `frontend/vite.config.ts`
- `frontend/src/index.css`
- `frontend/src/App.tsx`

### Proposed New Files
- `backend/app/main.py` - FastAPI application entrypoint.
- `backend/app/db.py` - PostgreSQL connection handler.
- `backend/app/models.py` - SQLAlchemy model for high scores.
- `backend/app/api/routes.py` - REST endpoints for scores.
- `backend/tests/test_scores_api.py` - Tests for the score API.
- `frontend/src/main.tsx` - React/Vite bootstrap file.
- `frontend/src/App.tsx` - Root React component.
- `frontend/src/components/GameCanvas.tsx` - Canvas rendering component.
- `frontend/src/components/GameHeader.tsx` - Displays title, score, lives.
- `frontend/src/components/HighScoresPanel.tsx` - Shows leaderboard.
- `frontend/src/components/GameFooter.tsx` - Handles messages and initials form.
- `frontend/src/game/logic.ts` - Core gameplay loop and mechanics.

### Existing Files Modified
- `dev_init.sh` - Start backend, frontend and ensure PostgreSQL is running.
- `.codex/install.sh` - Install new dependencies for backend and frontend.
- `backend/requirements.txt` - Add FastAPI, SQLAlchemy, psycopg2-binary.
- `frontend/package.json` - Add React, Vite, Tailwind CSS configuration.
- `DEVELOPMENT.md` - Document manual setup and run instructions.
- `run_tests.sh` - Run backend tests when present.

### Notes
- Design mockup (`design-mock.html`) specifies retro pixel-art styling using Tailwind CSS and a pixelated font.
- Local PostgreSQL instructions are in `postgres-docs.md`; database credentials should be stored in a `.env` file.
- Future enhancements like varied enemy types or multiple maze layouts are out of scope for the MVP.

## Tasks
- [x] 1.0 Project Setup
  - [x] 1.1 Create FastAPI and React scaffolding.
  - [x] 1.2 Configure PostgreSQL connection details.
  - [x] 1.3 Update `backend/requirements.txt` and `frontend/package.json`.
  - [x] 1.4 Implement environment start script in `dev_init.sh`.
  - [x] 1.5 Document setup steps in `DEVELOPMENT.md` and update `.codex/install.sh`.
- [x] 2.0 Canvas Game Layout
  - [x] 2.1 Configure Tailwind CSS in the Vite project.
  - [x] 2.2 Create React components per `design-mock.html` (header, canvas, scores, footer).
  - [x] 2.3 Add `<canvas>` element wrapped by `GameCanvas` component.
  - [x] 2.4 Ensure layout matches the mockup styling.
- [ ] 3.0 Core Gameplay Mechanics
  - [ ] 3.1 Implement main game loop in `logic.ts` with `requestAnimationFrame`.
  - [ ] 3.2 Implement player movement, shooting, and collision detection.
  - [ ] 3.3 Implement invader movement, projectiles, and pellet collection.
  - [ ] 3.4 Track levels, lives, and scoring.
  - [ ] 3.5 Manage game states (title, playing, game over).
- [x] 4.0 High Score API
  - [x] 4.1 Define SQLAlchemy models and migrations for high scores.
  - [x] 4.2 Create FastAPI routes to submit and fetch scores.
  - [x] 4.3 Add tests for the API endpoints.
  - [x] 4.4 Provide `.env.template` for required environment variables.
- [ ] 5.0 High Score Integration & Polish
  - [ ] 5.1 Connect frontend to the score API for submitting and viewing scores.
  - [ ] 5.2 Add initials entry form and high score table in the UI.
  - [ ] 5.3 Apply final styling and ensure components match mock design.
  - [ ] 5.4 Verify dev_init.sh runs migrations and starts both servers.
