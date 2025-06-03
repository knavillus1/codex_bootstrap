## Project Tree
```
.
AGENTS.md
CHANGELOG.md
DEVELOPMENT.md
README.md
backend
backend/requirements.txt
dev_init.sh
frontend
frontend/eslint.config.js
frontend/package-lock.json
frontend/package.json
run_tests.sh
```

## Relevant Files
- `.project-management/prd-background/PrototypeDesign.html` - Layout reference for dashboard and controls.
- `backend/requirements.txt` - Python dependencies.
- `frontend/package.json` - Frontend dependencies and scripts.

### Proposed New Files
- `backend/app/main.py` - FastAPI application entry point with simulation routes.
- `backend/app/simulation.py` - Core simulation engine managing organisms.
- `backend/tests/test_simulation.py` - Unit tests for simulation logic.
- `frontend/src/main.tsx` - React entry file created by Vite.
- `frontend/src/App.tsx` - Main React component with routing.
- `frontend/src/components/Canvas.tsx` - Renders organisms on a canvas/SVG.
- `frontend/src/components/Dashboard.tsx` - Displays stats and parameter controls.

### Existing Files Modified
- `dev_init.sh` - Updated to start backend and frontend for local development.

### Notes
- Follow the styles and layout defined in `PrototypeDesign.html` when building UI components.
- Ensure unit tests live alongside source files.

## Tasks
- [ ] 1.0 Implement FastAPI simulation engine and REST endpoints
  - [ ] 1.1 Create `backend/app` package with `main.py` entry point.
  - [ ] 1.2 Implement organism and environment classes in `simulation.py`.
  - [ ] 1.3 Add endpoints for start, stop, step, reset, and state retrieval.
  - [ ] 1.4 Provide endpoints to get and update simulation parameters.
  - [ ] 1.5 Write unit tests in `backend/tests/test_simulation.py`.
- [ ] 2.0 Set up React + Vite frontend scaffold
  - [ ] 2.1 Initialize Vite React project inside `frontend` directory.
  - [ ] 2.2 Configure ESLint and Tailwind as per repo standards.
  - [ ] 2.3 Add routing in `App.tsx` for main dashboard page.
- [ ] 3.0 Develop 2D canvas rendering of organisms
  - [ ] 3.1 Create `Canvas.tsx` to draw organisms using data from backend.
  - [ ] 3.2 Update CSS to style canvas area matching `PrototypeDesign.html`.
- [ ] 4.0 Build settings dashboard and simulation controls
  - [ ] 4.1 Implement `Dashboard.tsx` with start/stop/step/reset buttons.
  - [ ] 4.2 Add input controls for simulation parameters.
  - [ ] 4.3 Style controls to match `PrototypeDesign.html`.
- [ ] 5.0 Integrate frontend with backend and provide statistics display
  - [ ] 5.1 Fetch simulation state via REST endpoints at regular intervals.
  - [ ] 5.2 Display counts of organisms and nutrients in the dashboard.
  - [ ] 5.3 Connect control buttons to backend actions.
