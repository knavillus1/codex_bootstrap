# PRD: Basic Ecosystem Simulation Demo

## 1. Introduction/Overview

This feature delivers the core foundation of the EcoSim Circle of Life application - a working ecosystem simulation with visual representation. The demo showcases three organism types (Algae, Herbivores, Carnivores) interacting in a 2D environment with full behavioral models including growth, movement, consumption, reproduction, and death. Users can observe the ecosystem dynamics through a web interface with basic simulation controls.

**Problem Solved:** Provides a tangible, interactive demonstration of ecosystem dynamics that users can observe and interact with, forming the foundation for the complete EcoSim application.

**Goal:** Create a functional web demo where users can see organisms moving, growing, reproducing, and dying in a simulated ecosystem environment.

## 2. Goals

1. **Functional Simulation Engine:** Implement complete organism behaviors (movement, growth, consumption, reproduction, death) in a FastAPI backend
2. **Visual Representation:** Display all organism types and their interactions in real-time on a web canvas
3. **Basic Controls:** Provide reset and step controls for simulation management
4. **Observable Ecosystem:** Demonstrate clear ecosystem dynamics with population changes over time
5. **Technical Foundation:** Establish the core architecture for future feature expansion

## 3. User Stories

**As a researcher/educator**, I want to observe ecosystem dynamics in action so that I can understand predator-prey relationships and population cycles.

**As a curious user**, I want to reset the simulation and step through it manually so that I can observe how individual actions affect the ecosystem.

**As a developer/tester**, I want to see organisms visually represented with different sizes and colors so that I can verify the simulation logic is working correctly.

**As an ecosystem enthusiast**, I want to watch algae grow, herbivores eat algae, and carnivores hunt herbivores so that I can see the circle of life in action.

## 4. Functional Requirements

### Backend Simulation Engine
1. The system must implement three organism types: Algae (stationary, grows), Herbivores (mobile, eats algae), and Carnivores (mobile, eats herbivores)
2. The system must simulate a 2D environment with configurable boundaries (e.g., 500x500 coordinate space)
3. The system must implement time-step based simulation progression
4. The system must handle organism movement with energy costs for mobile organisms
5. The system must implement consumption mechanics (herbivores eating algae, carnivores eating herbivores)
6. The system must implement growth mechanics for all organism types based on consumed nutrients
7. The system must implement reproduction when organisms reach size/energy thresholds
8. The system must implement death conditions (energy depletion, consumption by predators)
9. The system must track and disperse nutrients when organisms die
10. The system must maintain nutrient conservation within the closed ecosystem

### API Endpoints
11. The system must provide `/simulation/reset` endpoint to initialize simulation with default parameters
12. The system must provide `/simulation/step` endpoint to advance simulation by one time step
13. The system must provide `/simulation/state` endpoint to return current positions, sizes, and types of all organisms
14. The system must provide `/stats` endpoint to return basic population counts and simulation step number

### Frontend Visualization
15. The system must render organisms on an HTML5 canvas or SVG area
16. The system must visually distinguish organism types by color (e.g., green for algae, brown for herbivores, red for carnivores)
17. The system must represent organism size visually (larger circles/shapes for bigger organisms)
18. The system must update the display in response to simulation state changes
19. The system must provide a "Reset" button that calls the reset endpoint and refreshes the display
20. The system must provide a "Step" button that advances the simulation by one step and updates the display
21. The system must display basic statistics (organism counts, simulation step) somewhere on the interface

### Data Management
22. The system must initialize with reasonable default parameters for all organism behaviors
23. The system must start with a balanced initial population (e.g., 20 algae, 10 herbivores, 5 carnivores)
24. The system must maintain simulation state in memory during operation
25. The system must handle edge cases like all organisms of a type dying out

## 5. Non-Goals (Out of Scope)

- **Advanced Controls:** Start/Stop/Pause functionality (will be added later)
- **Settings Dashboard:** Parameter adjustment interface (will be added later)
- **Real-time Updates:** Automatic simulation progression (manual stepping only for demo)
- **Performance Optimization:** Support for thousands of organisms (demo targets ~50 total organisms)
- **Data Persistence:** Saving/loading simulation states
- **Complex UI:** Polish, animations, or advanced styling
- **Authentication:** User accounts or session management
- **Mobile Responsiveness:** Desktop-focused demo only

## 6. Design Considerations

- **Reference Design:** Use the color scheme and layout concepts from `PrototypeDesign.html` as inspiration
- **Canvas Area:** Center the simulation canvas as the primary focus of the interface
- **Control Layout:** Place Reset and Step buttons prominently near the canvas
- **Visual Clarity:** Ensure organism sizes are easily distinguishable and appropriately scaled
- **Color Coding:** Use intuitive colors (green=algae, earth tones=herbivores, red=carnivores)
- **Statistics Display:** Simple text display showing counts, positioned to not interfere with simulation viewing

## 7. Technical Considerations

- **Backend Framework:** Use FastAPI with Python for the simulation engine
- **Frontend Framework:** Use React with Vite for the web interface
- **Communication:** RESTful API calls for simulation control and state retrieval
- **Rendering:** HTML5 Canvas or React SVG for organism visualization
- **State Management:** Simple React state for UI, server-side state for simulation
- **Coordinate System:** Use a normalized coordinate system (e.g., 0-500 for both X and Y)
- **Performance:** Target smooth updates for populations up to ~50 organisms total
- **Error Handling:** Basic error handling for API failures and edge cases

## 8. Success Metrics

1. **Functional Demo:** User can reset simulation, step through it, and see organisms responding appropriately
2. **Observable Behaviors:** Clear evidence of each behavior type (algae growing, herbivores moving and eating, carnivores hunting)
3. **Population Dynamics:** Visible population changes over multiple simulation steps
4. **Visual Clarity:** All organism types easily identifiable and their sizes clearly represented
5. **Technical Foundation:** Clean API structure and React components ready for future expansion
6. **Stability:** Demo runs without crashes for 100+ simulation steps

## 9. Open Questions

1. **Reproduction Details:** Should reproduction create offspring immediately or use eggs/spores with incubation periods?
2. **Boundary Behavior:** Should organisms wrap around edges (toroidal) or bounce off walls?
3. **Initial Nutrient Distribution:** Should nutrients start distributed in the environment or only within organisms?
4. **Performance Targets:** What's the maximum acceptable delay between clicking "Step" and seeing the updated visualization?
5. **Error Recovery:** How should the system handle edge cases like all organisms dying?
6. **Coordinate Scaling:** Should the frontend canvas size be fixed or responsive to the container?

---

**Target Implementation Time:** 1-2 weeks for a junior developer
**Priority:** High - Foundation for entire application
**Dependencies:** None (initial implementation)
