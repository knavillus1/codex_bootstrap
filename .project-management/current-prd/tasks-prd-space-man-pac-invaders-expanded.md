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

### Existing Files Modified
- `frontend/src/GameCanvas.tsx` - Render multiple mazes and invaders
- `backend/app/api/routes.py` - High score POST/GET endpoints with PostgreSQL
- `dev_init.sh` - Include PostgreSQL startup and migration steps

### Notes
- Unit tests should live next to implementation files.
- Follow Tailwind classes outlined in the mock HTML for layout.

## Tasks
- [ ] 1.0 Integrate PostgreSQL database using guidelines in `prd-background/postgres-docs.md`
- [ ] 2.0 Implement UI per `prd-background/design-mock.html` with React and Tailwind
- [ ] 3.0 Build HTML5 Canvas game logic for Space Man Pac, Invaders, and UFO
- [ ] 4.0 Expose high score API endpoints and connect frontend to store/retrieve scores
- [ ] 5.0 Update environment scripts and documentation for full local setup
