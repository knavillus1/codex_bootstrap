## Pre-Feature Development Project Tree
```
.
run_tests.sh
frontend/
frontend/eslint.config.js
frontend/package-lock.json
frontend/tailwind.config.js
frontend/tsconfig.node.json
frontend/index.html
frontend/postcss.config.js
frontend/tsconfig.json
frontend/vite.config.ts
frontend/src/
frontend/package.json
dev_init.sh
AGENTS.md
backend/
backend/tests/
backend/app/
backend/requirements.txt
DEVELOPMENT.md
CHANGELOG.md
README.md
LICENSE
```

## Relevant Files
- `frontend/src` - React components and game logic
- `backend/app` - FastAPI application
- `backend/tests` - Existing backend tests
- `.project-management/current-prd/prd-background/design-mock.html` - UI layout reference
- `.project-management/current-prd/prd-background/postgres-docs.md` - local PostgreSQL setup

### Proposed New Files
- `frontend/src/game/mazeLayouts.ts` - Maze layout definitions
- `frontend/src/game/ufo.ts` - Logic for special UFO invader
- `backend/app/migrations/` - Database migration scripts
- `backend/alembic.ini` - Alembic configuration

### Existing Files Modified
- `frontend/src/GameCanvas.tsx` - Render multiple mazes and invaders
- `backend/app/api/routes.py` - High score POST/GET endpoints with PostgreSQL
- `dev_init.sh` - Include PostgreSQL startup and migration steps
- `backend/requirements.txt` - Backend dependencies
- `DEVELOPMENT.md` - Local setup instructions
- `CHANGELOG.md` - Project changelog

### Notes
- Unit tests should live next to implementation files.
- Follow Tailwind classes outlined in the mock HTML for layout.

## Tasks
- [x] 1.0 Integrate PostgreSQL database using guidelines in `prd-background/postgres-docs.md`
  - [x] 1.1 Add `psycopg2` and migration tooling to `backend/requirements.txt`
  - [x] 1.2 Update `backend/app/db.py` to read `DATABASE_URL` from environment variables
  - [x] 1.3 Create `.env.template` with database connection placeholders
  - [x] 1.4 Configure Alembic in `backend/app/migrations` and generate initial migration for `high_scores`
  - [x] 1.5 Document local database setup in `DEVELOPMENT.md`
- [ ] 2.0 Implement UI per `prd-background/design-mock.html` with React and Tailwind
  - [ ] 2.1 Import the "Press Start 2P" font and configure Tailwind to use it
  - [ ] 2.2 Apply mockup classes to `GameHeader`, `GameCanvas`, `HighScoresPanel` and `GameFooter`
  - [ ] 2.3 Make the layout responsive so the high score panel stacks below the canvas on small screens
  - [ ] 2.4 Style overlay messages and lives display as shown in the mock
- [ ] 3.0 Build HTML5 Canvas game logic for Space Man Pac, Invaders, and UFO
  - [ ] 3.1 Add `mazeLayouts.ts` containing at least three maze layouts
  - [ ] 3.2 Rotate layouts as the player progresses through levels
  - [ ] 3.3 Implement Power Pellet frightened mode lasting seven seconds
  - [ ] 3.4 Add UFO invader logic in `ufo.ts` and integrate with game loop
  - [ ] 3.5 Show game states for title, get ready, playing, player death and game over
- [x] 4.0 Expose high score API endpoints and connect frontend to store/retrieve scores
  - [x] 4.1 Ensure `GET /api/scores` returns the top 10 scores from PostgreSQL
  - [x] 4.2 Validate input to `POST /api/scores` and return the created record
  - [x] 4.3 Write tests for both endpoints in `backend/tests`
  - [x] 4.4 Update `frontend/src/api.ts` and components to submit and display scores
  - [x] 4.5 Display the high score table on the title and game over screens
- [x] 5.0 Update environment scripts and documentation for full local setup
  - [x] 5.1 Add PostgreSQL startup and migration commands to `dev_init.sh`
  - [x] 5.2 Document the setup process in `DEVELOPMENT.md`
  - [x] 5.3 Record new dependencies and setup steps in `CHANGELOG.md`
