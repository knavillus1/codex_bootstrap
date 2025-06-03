**Project Title:** "EcoSim Circle of Life" - A React+Vite Frontend & FastAPI Backend Web App

**Objective:**
Develop a web application that simulates a simple ecosystem with three types of organisms: Algae, Herbivores, and Carnivores. The simulation should visually represent the creatures and their interactions in a 2D environment. A settings dashboard will allow users to control simulation parameters and view population statistics.

**Technology Stack:**
*   **Frontend:** React (with Vite for tooling)
*   **Backend:** FastAPI (Python)
*   **Communication:** RESTful APIs (JSON)

**I. Core Simulation Logic (To be implemented in FastAPI Backend):**

The simulation will operate in discrete time steps. The environment is a 2D space (e.g., a square or circle, consider toroidal/wrap-around boundaries).

    **A. Environment:**
        1.  **Nutrients:**
            *   Nutrients are a finite resource within the closed system.
            *   Total available nutrient in the simulation is adjustable via the settings dashboard.
            *   Nutrients exist in a "dispersed" state in the environment or are stored within organisms.
            *   Dispersed nutrients can be modeled as concentrated points or a general "nutrient level" in local areas.
        2.  **Light:** Assume a constant and uniform light source available for Algae.

    **B. Organism Types & Behaviors:**

        **1. Algae:**
            *   **Attributes:** Position (x, y), Size, Stored Energy, Stored Nutrient.
            *   **Stationary:** Do not move.
            *   **Growth:**
                *   Absorb light (constant rate).
                *   Absorb dispersed nutrients from their immediate vicinity.
                *   Growth increases their Size, Stored Energy, and Stored Nutrient content.
            *   **Reproduction:**
                *   When Algae reach a `algae_reproduction_size_threshold`, they reproduce.
                *   Reproduction involves releasing a configurable number of spores (`algae_spore_count`).
                *   Spores land randomly within a `algae_spore_dispersal_radius` of the parent.
                *   A new Algae entity starts growing from a spore at a small initial size.
                *   Reproduction might slightly reduce the parent's size/energy.
            *   **Death:** Algae are consumed by Herbivores. Upon consumption, their stored nutrients are transferred to the Herbivore, and their energy might also be partially transferred or contribute to the Herbivore's energy.

        **2. Herbivores:**
            *   **Attributes:** Position (x, y), Size, Current Energy, Stored Nutrient, Speed, `herbivore_baseline_energy_reserve_factor`.
            *   **Movement:**
                *   Actively move around seeking Algae.
                *   Movement costs energy (`herbivore_movement_energy_cost_per_unit_distance`).
                *   Speed is proportional to their Size (`herbivore_speed_size_factor`).
            *   **Consumption:**
                *   When a Herbivore comes into contact (or within a small `herbivore_eating_radius`) with Algae, it consumes the Algae.
                *   The Herbivore gains the Algae's Stored Nutrient and a portion of its Stored Energy.
                *   Consumed Algae are removed from the simulation.
            *   **Growth:**
                *   Size increases proportionally to the Stored Nutrient consumed.
            *   **Reproduction:**
                *   When a Herbivore reaches a `herbivore_reproduction_size_threshold` and has sufficient energy, it reproduces.
                *   Reproduction involves laying a configurable number of eggs (`herbivore_egg_count`).
                *   Laying eggs consumes a significant amount of energy (`herbivore_reproduction_energy_cost`).
                *   Eggs are stationary entities.
                *   Eggs incubate for a `herbivore_egg_incubation_period` (in simulation steps).
                *   Eggs are immune to predation by Carnivores.
                *   After incubation, eggs hatch into new small Herbivores.
            *   **Death:**
                *   Die if Current Energy falls below their baseline energy reserve (Size * `herbivore_baseline_energy_reserve_factor`).
                *   Upon death (not by predation), their Stored Nutrient is scattered/dispersed into the environment within a `herbivore_death_nutrient_dispersal_radius`.
                *   Also die if eaten by Carnivores.

        **3. Carnivores:**
            *   **Attributes:** Position (x, y), Size, Current Energy, Stored Nutrient, Speed, `carnivore_baseline_energy_reserve_factor`.
            *   **Movement:**
                *   Actively move around seeking Herbivores.
                *   Movement costs energy (`carnivore_movement_energy_cost_per_unit_distance`).
                *   Speed is proportional to their Size (`carnivore_speed_size_factor`).
            *   **Consumption:**
                *   When a Carnivore comes into contact (or within a small `carnivore_eating_radius`) with a Herbivore (but not an egg), it consumes the Herbivore.
                *   The Carnivore gains the Herbivore's Stored Nutrient and a portion of its Stored Energy.
                *   Consumed Herbivores are removed from the simulation.
            *   **Growth:**
                *   Size increases proportionally to the Stored Nutrient consumed.
            *   **Reproduction:**
                *   When a Carnivore reaches a `carnivore_reproduction_size_threshold` and has sufficient energy, it reproduces.
                *   Reproduction involves creating a configurable number of offspring (`carnivore_offspring_count`). This is live birth.
                *   Reproduction consumes a significant amount of energy (`carnivore_reproduction_energy_cost`).
                *   New Carnivores start at a small initial size.
            *   **Death:**
                *   Die if Current Energy falls below their baseline energy reserve (Size * `carnivore_baseline_energy_reserve_factor`).
                *   Upon death (not by predation), their Stored Nutrient is scattered/dispersed into the environment within a `carnivore_death_nutrient_dispersal_radius`.

**II. Backend (FastAPI):**

1.  **Simulation Engine:**
    *   Manages the state of all organisms and the environment.
    *   Updates the simulation state at each time step based on the rules defined above.
    *   Handles interactions (consumption, reproduction, death, nutrient dispersal).
2.  **API Endpoints:**
    *   `/simulation/start`: Initializes and starts the simulation with current settings.
    *   `/simulation/stop`: Pauses the simulation.
    *   `/simulation/step`: Advances the simulation by one step (if paused).
    *   `/simulation/reset`: Resets the simulation to initial conditions based on current settings.
    *   `/simulation/state`: GET endpoint to fetch the current state of all organisms (positions, sizes, types) and relevant environment data for frontend rendering. (Consider WebSockets for real-time updates if feasible, otherwise polling).
    *   `/settings`:
        *   GET to retrieve all current simulation parameters.
        *   POST/PUT to update simulation parameters.
    *   `/stats`: GET endpoint to fetch current statistics (e.g., number of Algae, Herbivores, Carnivores, total dispersed nutrient).

**III. Frontend (React + Vite):**

1.  **Simulation Display Area:**
    *   A 2D canvas or SVG area to visually represent the simulation.
    *   Algae, Herbivores, Carnivores, and Herbivore Eggs should be distinguishable (e.g., by color, shape).
    *   Size of organisms should be visually represented.
    *   Updates in (near) real-time by fetching data from the `/simulation/state` endpoint.
2.  **Settings Dashboard & Controls:**
    *   **Simulation Controls:** Buttons for Start, Stop, Step, Reset.
    *   **Parameter Controls:** Input fields (sliders, number inputs) for *all* configurable variables mentioned above, including but not limited to:
        *   Initial number of each organism type.
        *   Total environment nutrient.
        *   Growth rates/factors.
        *   Energy costs (movement, reproduction).
        *   Reproduction thresholds (size, energy).
        *   Reproduction outputs (spore count, egg count, offspring count).
        *   Dispersal radii (spores, death nutrients).
        *   Incubation periaods.
        *   Baseline energy reserve factors.
        *   Eating radii.
        *   Simulation step speed/delay (if applicable for visualization).
    *   **Statistics Display:**
        *   Current number of Algae.
        *   Current number of Herbivores (and eggs separately if desired).
        *   Current number of Carnivores.
        *   Current total dispersed nutrient in the environment.
        *   Current simulation time/step count.

**IV. Key Considerations & Implementation Details:**

*   **Modularity:** Structure code logically (e.g., separate classes/modules for organism types, environment, simulation logic).
*   **Configuration:** All "magic numbers" (thresholds, costs, rates, radii) should be configurable parameters accessible through the settings dashboard. Provide sensible defaults.
*   **Performance:** While this is a "simple" simulator, consider efficiency, especially if the number of organisms can grow large. The backend should handle the bulk of the computation.
*   **User Experience:** The dashboard should be intuitive. Changes to settings should ideally be applicable to a running simulation or upon reset.
*   **State Management (Frontend):** Use appropriate React state management (Context API, Zustand, Redux Toolkit, etc.) for dashboard settings and simulation data.
*   **Error Handling:** Implement basic error handling for API requests.