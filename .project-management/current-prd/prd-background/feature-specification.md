
## Space Man Pac Invaders - Initial Feature Specification 

**1. Game Overview & Concept**

Space Man Pac Invaders is a fast-paced, arcade-style game that merges the iconic gameplay of Pac-Man and Space Invaders. Players control "Space Man Pac," a helmeted version of Pac-Man, navigating a maze-like space station. The objective is to collect all "Energy Pellets" in the level while avoiding or destroying descending "Invader" aliens that also patrol the maze and shoot projectiles. Power-ups grant temporary abilities, such as invincibility and the power to "eat" invaders.

**2. Core Gameplay Mechanics**

*   **Player Character (Space Man Pac):**
    *   Moves in 4 directions (Up, Down, Left, Right) within the defined paths of the maze.
    *   Cannot stop mid-tile; movement is continuous from one tile intersection to the next once a direction is inputted.
    *   Starts with 3 lives.
    *   **Action 1: Movement:** Navigates the maze.
    *   **Action 2: Shooting:** Can fire a single laser projectile upwards (relative to the screen, classic Space Invaders style). Only one player laser can be on screen at a time.
    *   **Action 3: Collecting:** Automatically collects Energy Pellets and Power Pellets by moving over them.

*   **Enemies (Invaders):**
    *   A group of classic pixelated Invaders.
    *   They move as a block, horizontally, within the confines of the maze corridors they occupy. When an edge Invader in the block hits a maze wall, the entire block reverses direction and "descends" one tile row lower.
    *   Invaders periodically fire laser projectiles downwards.
    *   If an Invader collides with Space Man Pac, the player loses a life (unless under the effect of a Power Pellet).
    *   If an Invader's projectile hits Space Man Pac, the player loses a life.
    *   If the Invader block "descends" to the same row as Space Man Pac's starting position (or a predefined "bottom line"), the player loses a life (or game over, TBD - let's say lose a life for now to give more chances).

*   **Collectibles:**
    *   **Energy Pellets:** Small, glowing dots scattered throughout the maze paths. Collecting all Energy Pellets completes the level. Each pellet grants a small number of points.
    *   **Power Pellets (e.g., "Supernova Charges"):** Larger, flashing orbs. Typically 4 per level, placed in strategic corners or sections.
        *   When collected, Invaders turn a different color (e.g., blue and "frightened") for a short duration (e.g., 5-10 seconds).
        *   During this state, Space Man Pac can "eat" (collide with) frightened Invaders for bonus points. Eaten Invaders are removed from the level for the duration of the Power Pellet effect and then respawn at their starting formation (or are permanently gone for the level - let's go with permanently gone for the level to make it more impactful).
        *   Player might also gain temporary rapid fire or a shield during this time, TBD. *Initial Spec: Focus on the "eating invaders" aspect first for true Pac-Man feel.*

*   **Level Structure & Progression:**
    *   Levels consist of a maze layout filled with Energy Pellets and a few Power Pellets.
    *   Each level starts with a fresh formation of Invaders.
    *   Difficulty increases with each level:
        *   Invaders move faster.
        *   Invaders shoot more frequently.
        *   Power Pellet duration might decrease.
        *   Number of Invaders might increase (up to a screen limit).
        *   (Future) Different maze layouts. For MVP, 1-3 distinct maze layouts that cycle.

*   **Scoring:**
    *   Collecting Energy Pellet: 10 points
    *   Shooting down an Invader: 50 points
    *   Eating a frightened Invader (during Power Pellet effect):
        *   1st Invader: 200 points
        *   2nd Invader: 400 points
        *   3rd Invader: 800 points
        *   4th Invader: 1600 points (etc., doubling for each subsequent Invader eaten during a single Power Pellet activation)
    *   Bonus life awarded at certain score milestones (e.g., every 10,000 points).

*   **Controls (Keyboard):**
    *   Arrow Keys (Up, Down, Left, Right): Move Space Man Pac.
    *   Space Bar: Fire laser.

*   **Game States:**
    *   **Attract Mode/Title Screen:** Shows game title, high scores, "Press Enter to Start."
    *   **Get Ready:** Brief pause before level starts, showing "GET READY!"
    *   **Playing:** Active gameplay.
    *   **Player Death:** Short animation/sound, decrement life, Invaders pause, then resume from "Get Ready" if lives remain.
    *   **Level Clear:** Short animation/sound, score tally for level, then proceed to next level's "Get Ready."
    *   **Game Over:** Occurs when all lives are lost. Display "GAME OVER." Proceed to High Score Entry if score is high enough.
    *   **High Score Entry:** If player's score qualifies for the leaderboard, prompt for 3 initials.
    *   **High Score Display:** Shows top scores (e.g., top 10).

**3. Aesthetic & Presentation**

*   **Visual Style:**
    *   **Overall:** Retro pixel art, 8-bit inspired, but clean and vibrant.
    *   **Color Palette:** Dark space backgrounds (deep blues, purples, black) with bright, neon-like colors for maze walls, player, enemies, pellets, and projectiles.
        *   Space Man Pac: Classic yellow, but with a white/grey astronaut helmet with a visible blue or cyan visor.
        *   Invaders: Classic green, magenta, cyan pixelated forms. Frightened state: Deep blue.
        *   Maze Walls: Could be metallic grey, glowing blue lines, or asteroid-like textures depending on the level theme (if themes are introduced later). For MVP, consistent glowing lines.
        *   Energy Pellets: Small, bright white or yellow dots.
        *   Power Pellets: Larger, pulsating bright pink or orange orbs.
        *   Projectiles: Player laser (e.g., red), Invader lasers (e.g., white or green).
    *   **Animations:** Simple, crisp pixel animations. Space Man Pac's "mouth" chomping. Invaders' simple marching animation. Explosions for destroyed Invaders and player death.

*   **Audio Design (SFX & Music):**
    *   **SFX:** Chiptune, 8-bit style.
        *   Player Movement: A subtle "wakka-wakka" sound when moving over empty spaces, a slightly different "chomp" for Energy Pellets.
        *   Player Shoot: "Pew" sound.
        *   Invader Shoot: Different "Pew" or "Zap" sound.
        *   Invader Destroyed (by shot): Short explosion sound.
        *   Invader Eaten (Power Pellet): Distinct "gulp" or "power-chomp" sound.
        *   Power Pellet Pickup: Upbeat jingle.
        *   Power Pellet Active Loop: A tense, driving background sound loop while Power Pellet is active.
        *   Player Death: Downward arpeggio, explosion sound.
        *   Level Start: Short, positive jingle.
        *   Level Clear: Victorious jingle.
        *   Game Over: Melancholy jingle.
    *   **Music:**
        *   Title Screen: Catchy, upbeat chiptune theme.
        *   In-Game: A driving, rhythmic chiptune track that subtly increases in tempo as Invaders get lower or fewer pellets remain. This track should be distinct from the Power Pellet active loop.

**4. Feature Set**

*   **MVP (Minimum Viable Product):**
    *   Playable Space Man Pac character with 4-directional movement and upward shooting.
    *   At least one static maze layout.
    *   Functioning Energy Pellets and Power Pellets.
    *   Block of Invaders with standard horizontal march, reverse, descend, and downward shooting mechanics, constrained by maze walls.
    *   Collision detection (Player-Invader, Player-Projectile, PlayerBullet-Invader, Player-Pellet).
    *   Life system (start with 3 lives).
    *   Scoring system for all relevant actions.
    *   Game states: Title, Get Ready, Playing, Player Death, Game Over.
    *   Basic sound effects for key actions.
    *   Persistent high score table (top 10) with 3-initial entry.
    *   Increasing difficulty across a few levels (e.g., Invader speed).

*   **Post-MVP / Future Enhancements:**
    *   Multiple, distinct maze layouts.
    *   More varied Invader types with different behaviors or point values.
    *   "UFO/Mothership" equivalent: A special Invader that occasionally flies across the top of the maze, offering bonus points if shot.
    *   More sophisticated Invader AI (e.g., some Invaders might break formation to chase).
    *   Additional power-ups (e.g., temporary shield, rapid fire, temporary freeze of Invaders).
    *   Animated cutscenes between levels or for game start/end.
    *   More detailed background art.
    *   More complex audio landscape (more sound variations, richer music).
    *   Difficulty settings.
    *   Co-op mode (local).

**5. Technical Stack & Data Persistence**

*   **Frontend:**
    *   React 18 with Vite (for development and build).
    *   Tailwind CSS (for styling UI elements outside the game canvas).
    *   React Router (for navigating between game screen, high score screen, title screen).
    *   HTML5 Canvas API (likely within a React component) for rendering the game itself.
*   **Backend:**
    *   Python 3.13 with FastAPI.
    *   Uvicorn (as the ASGI server for FastAPI).
*   **Database:**
    *   PostgreSQL for storing user stats (high scores: initials, score, date).
*   **Data Flow for High Scores:**
    1.  Game ends, player achieves a high score.
    2.  React frontend prompts for 3 initials.
    3.  Frontend sends a POST request to a FastAPI endpoint (e.g., `/api/scores`) with `{ "initials": "ABC", "score": 12345 }`.
    4.  FastAPI backend validates the data and stores it in the PostgreSQL database.
    5.  For displaying high scores, React frontend sends a GET request to `/api/scores`.
    6.  FastAPI backend queries PostgreSQL for the top N scores and returns them as JSON.

**6. High Score System Details**

*   The game will maintain a list of the top 10 high scores.
*   When a game ends, if the player's score is high enough to make the top 10, they will be prompted to enter three alphanumeric characters for their initials.
*   The high score list will display Rank, Score, and Initials.
*   Scores will be persisted in the PostgreSQL database so they are available even if the application is restarted.
*   No user accounts or authentication are required. Entry is anonymous via initials.
