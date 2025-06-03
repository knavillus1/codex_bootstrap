# Tasks: Basic Ecosystem Simulation Demo

## Project Tree
```
/Users/kevinsullivan/code/codex_bootstrap
├── AGENTS.md
├── CHANGELOG.md
├── DEVELOPMENT.md
├── README.md
├── backend
│   └── requirements.txt
├── dev_init.sh
├── frontend
│   ├── eslint.config.js
│   └── package.json
└── run_tests.sh
```

## Relevant Files

- `backend/main.py` - FastAPI application entry point
- `CHANGELOG.md` - Summary of changes
- `backend/models/organism.py` - Base organism definition
- `backend/tests/test_organism.py` - Unit tests for Organism
- `backend/models/algae.py` - Algae organism implementation
- `backend/models/herbivore.py` - Herbivore organism implementation
- `backend/models/carnivore.py` - Carnivore organism implementation
- `backend/tests/test_specific_organisms.py` - Unit tests for concrete organisms
- `backend/simulation/environment.py` - Environment model for managing nutrients
- `backend/simulation/engine.py` - Simulation engine orchestrating organisms
- `backend/tests/test_environment.py` - Unit tests for environment
- `backend/tests/test_simulation_engine.py` - Unit tests for simulation engine
- `backend/tests/test_main.py` - Unit tests for FastAPI root endpoint
- `backend/tests/test_collision_detection.py` - Unit tests for collision logic
- `backend/api/simulation.py` - API endpoints for simulation control
- `backend/tests/test_api.py` - Integration tests for simulation API
- `dev_init.sh` - Development startup script
- `pytest.ini` - Pytest configuration
- `frontend/src/dummy.js` - Placeholder script for linting
- `frontend/src/index.tsx` - Placeholder React entry

### Notes

- Backend uses FastAPI with Python for simulation engine
- Frontend uses React with Vite for web interface
- Use `uvicorn main:app --reload` to run backend development server
- Use `npm run dev` to run frontend development server
- Unit tests: `pytest` for backend, `npm test` for frontend

## Tasks

- [x] 1.0 Setup Backend Infrastructure and Core Models
  - [x] 1.1 Initialize FastAPI project structure with proper directory layout
  - [x] 1.2 Update requirements.txt with FastAPI, uvicorn, pydantic, and testing dependencies
  - [x] 1.3 Create base Organism abstract class with core properties (position, size, energy, nutrients)
  - [x] 1.4 Implement Organism base methods (move, grow, reproduce, die, consume_nutrients)
  - [x] 1.5 Create Algae class inheriting from Organism with stationary growth behavior
  - [x] 1.6 Create Herbivore class inheriting from Organism with movement and algae consumption
  - [x] 1.7 Create Carnivore class inheriting from Organism with movement and herbivore hunting
  - [x] 1.8 Write unit tests for all organism classes and their behaviors
  - [x] 1.9 Set up pytest configuration and test directory structure

- [ ] 2.0 Implement Simulation Engine and Environment
  - [x] 2.1 Create Environment class to manage 2D coordinate space (500x500 default)
  - [x] 2.2 Implement nutrient distribution and tracking system within environment
  - [x] 2.3 Create SimulationEngine class to manage organism collections and time steps
  - [x] 2.4 Implement collision detection for organism interactions (eating, reproduction)
  - [x] 2.5 Add organism spawning logic with configurable initial populations
  - [c] 2.6 Implement energy costs for movement and growth calculations
  - [ ] 2.7 Add reproduction mechanics when organisms reach size/energy thresholds
  - [ ] 2.8 Implement death conditions and nutrient release back to environment
  - [ ] 2.9 Add boundary handling (wrap-around or collision with walls)
  - [ ] 2.10 Write comprehensive unit tests for simulation engine and environment

- [ ] 3.0 Create API Endpoints for Simulation Control
  - [x] 3.1 Set up FastAPI main application with CORS middleware for frontend
  - [x] 3.2 Create /simulation/reset endpoint to initialize simulation with default parameters
  - [x] 3.3 Create /simulation/step endpoint to advance simulation by one time step
  - [x] 3.4 Create /simulation/state endpoint returning organism positions, sizes, and types
  - [x] 3.5 Create /stats endpoint returning population counts and simulation step number
  - [ ] 3.6 Implement proper error handling and HTTP status codes for all endpoints
  - [ ] 3.7 Add request/response models using Pydantic for type safety
  - [ ] 3.8 Write integration tests for all API endpoints
  - [ ] 3.9 Add API documentation with proper OpenAPI/Swagger descriptions

- [ ] 4.0 Build Frontend React Application
  - [ ] 4.1 Initialize React project with Vite and TypeScript configuration
  - [ ] 4.2 Update package.json with required dependencies (React, TypeScript, Canvas/SVG libraries)
  - [ ] 4.3 Create main App component with layout matching PrototypeDesign.html structure
  - [ ] 4.4 Set up CSS variables and styling based on the provided design system
  - [ ] 4.5 Create TypeScript interfaces for simulation data (Organism, SimulationState, Stats)
  - [ ] 4.6 Implement API service module for backend communication with proper error handling
  - [ ] 4.7 Create basic component structure (SimulationCanvas, ControlPanel, StatsDisplay)
  - [ ] 4.8 Set up React state management for simulation data and UI state
  - [ ] 4.9 Add basic routing and error boundary components if needed

- [ ] 5.0 Implement Organism Visualization and User Controls
  - [ ] 5.1 Create SimulationCanvas component using HTML5 Canvas or React SVG
  - [ ] 5.2 Implement organism rendering with color coding (green=algae, brown=herbivores, red=carnivores)
  - [ ] 5.3 Add size-based visual representation for organisms (larger circles for bigger organisms)
  - [ ] 5.4 Create ControlPanel component with Reset and Step buttons
  - [ ] 5.5 Implement button click handlers that call appropriate API endpoints
  - [ ] 5.6 Create StatsDisplay component showing population counts and simulation step
  - [ ] 5.7 Add real-time canvas updates when simulation state changes
  - [ ] 5.8 Implement proper coordinate scaling between backend (500x500) and canvas display
  - [ ] 5.9 Add basic error handling and loading states for user feedback
  - [ ] 5.10 Write unit tests for all React components and user interactions
