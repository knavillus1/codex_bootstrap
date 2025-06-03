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

- `backend/main.py` - FastAPI application entry point and main simulation endpoints
- `backend/models/organism.py` - Base organism class and behavior implementations
- `backend/models/algae.py` - Algae organism implementation (stationary, grows)
- `backend/models/herbivore.py` - Herbivore organism implementation (mobile, eats algae)
- `backend/models/carnivore.py` - Carnivore organism implementation (mobile, eats herbivores)
- `backend/simulation/engine.py` - Core simulation engine managing time steps and organism interactions
- `backend/simulation/environment.py` - 2D environment management and nutrient tracking
- `backend/api/simulation.py` - API endpoints for simulation control (/reset, /step, /state)
- `backend/api/stats.py` - API endpoint for population statistics
- `backend/tests/test_organisms.py` - Unit tests for organism behaviors
- `backend/tests/test_simulation.py` - Unit tests for simulation engine
- `backend/tests/test_api.py` - Integration tests for API endpoints
- `frontend/src/App.tsx` - Main React application component
- `frontend/src/components/SimulationCanvas.tsx` - Canvas component for rendering organisms
- `frontend/src/components/ControlPanel.tsx` - Control buttons (Reset, Step)
- `frontend/src/components/StatsDisplay.tsx` - Statistics display component
- `frontend/src/services/api.ts` - API service for communicating with backend
- `frontend/src/types/simulation.ts` - TypeScript interfaces for simulation data
- `frontend/src/utils/canvas.ts` - Canvas rendering utilities
- `frontend/src/App.test.tsx` - Unit tests for main App component
- `frontend/src/components/SimulationCanvas.test.tsx` - Unit tests for canvas component

### Notes

- Backend uses FastAPI with Python for simulation engine
- Frontend uses React with Vite for web interface
- Use `uvicorn main:app --reload` to run backend development server
- Use `npm run dev` to run frontend development server
- Unit tests: `pytest` for backend, `npm test` for frontend

## Tasks

- [ ] 1.0 Setup Backend Infrastructure and Core Models
  - [ ] 1.1 Initialize FastAPI project structure with proper directory layout
  - [ ] 1.2 Update requirements.txt with FastAPI, uvicorn, pydantic, and testing dependencies
  - [ ] 1.3 Create base Organism abstract class with core properties (position, size, energy, nutrients)
  - [ ] 1.4 Implement Organism base methods (move, grow, reproduce, die, consume_nutrients)
  - [ ] 1.5 Create Algae class inheriting from Organism with stationary growth behavior
  - [ ] 1.6 Create Herbivore class inheriting from Organism with movement and algae consumption
  - [ ] 1.7 Create Carnivore class inheriting from Organism with movement and herbivore hunting
  - [ ] 1.8 Write unit tests for all organism classes and their behaviors
  - [ ] 1.9 Set up pytest configuration and test directory structure

- [ ] 2.0 Implement Simulation Engine and Environment
  - [ ] 2.1 Create Environment class to manage 2D coordinate space (500x500 default)
  - [ ] 2.2 Implement nutrient distribution and tracking system within environment
  - [ ] 2.3 Create SimulationEngine class to manage organism collections and time steps
  - [ ] 2.4 Implement collision detection for organism interactions (eating, reproduction)
  - [ ] 2.5 Add organism spawning logic with configurable initial populations
  - [ ] 2.6 Implement energy costs for movement and growth calculations
  - [ ] 2.7 Add reproduction mechanics when organisms reach size/energy thresholds
  - [ ] 2.8 Implement death conditions and nutrient release back to environment
  - [ ] 2.9 Add boundary handling (wrap-around or collision with walls)
  - [ ] 2.10 Write comprehensive unit tests for simulation engine and environment

- [ ] 3.0 Create API Endpoints for Simulation Control
  - [ ] 3.1 Set up FastAPI main application with CORS middleware for frontend
  - [ ] 3.2 Create /simulation/reset endpoint to initialize simulation with default parameters
  - [ ] 3.3 Create /simulation/step endpoint to advance simulation by one time step
  - [ ] 3.4 Create /simulation/state endpoint returning organism positions, sizes, and types
  - [ ] 3.5 Create /stats endpoint returning population counts and simulation step number
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
