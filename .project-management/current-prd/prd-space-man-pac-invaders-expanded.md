## 1. Introduction/Overview
"Space Man Pac Invaders" is a retro-inspired browser game combining Pac-Man maze navigation with descending Space Invaders. Players collect Energy Pellets, blast Invaders, and try to top the high score table stored in PostgreSQL. This PRD expands upon the original MVP by adding multiple maze layouts and a bonus UFO invader to provide fresh challenges while retaining fast-paced, single-screen gameplay.

## 2. Goals
1. Deliver a polished gameplay loop that includes multiple maze layouts cycling between levels.
2. Introduce a special "UFO" invader that occasionally crosses the top of the maze for bonus points.
3. Maintain persistent high scores in PostgreSQL accessible through a simple API.
4. Ensure the visual layout matches `design-mock.html` using React + Tailwind CSS.

## 3. User Stories
- **As a player**, I want to maneuver Space Man Pac through each maze, collecting Energy Pellets and Power Pellets so I can clear levels and increase my score.
- **As a player**, I want to shoot at Invaders and the occasional UFO for additional points while avoiding their projectiles.
- **As a player**, I want the game to deduct one life if Invaders descend to the bottom row so I have more chances to progress.
- **As a player**, I want my initials and score saved when I achieve a high score so I can see my ranking later.
- **As a returning player**, I want the high score list to persist between sessions so I can compete with previous runs.

## 4. Functional Requirements
1. The game must render maze walls, pellets, Space Man Pac, Invaders, and projectiles using HTML5 Canvas inside a React component.
2. Space Man Pac must move in four directions using arrow keys and fire a single upward laser with the space bar.
3. Invaders must move horizontally, reverse at maze walls, descend one row on reversal, and fire downward projectiles.
4. If the Invader block reaches the bottom row, the player loses one life and the formation resets.
5. Power Pellets must turn Invaders frightened for **7 seconds** allowing Space Man Pac to eat them for bonus points.
6. The game must include at least **three** distinct maze layouts that rotate as levels progress.
7. A special UFO invader must occasionally traverse the top of the screen awarding bonus points when shot.
8. The game must track lives (starting at three), score, and level, displaying appropriate game states (title, get ready, playing, player death, game over).
9. When the game ends, if the player's score ranks in the top 10, the UI must prompt for three-letter initials and store the score in PostgreSQL via a FastAPI endpoint.
10. The high score list must be retrievable from PostgreSQL and displayed on the title screen and game over screen.

## 5. Non-Goals (Out of Scope)
- Multiplayer modes or networked play.
- Complex Invader AI beyond standard marching formation.
- Additional power-ups besides Power Pellets.
- Account-based user authentication.

## 6. Design Considerations
- Follow the pixel-art aesthetic and layout detailed in `design-mock.html`.
- Use Tailwind CSS classes in React components to mirror the mockup's headers, canvas area, high score panel, and footer.

## 7. Technical Considerations
- Frontend built with React 18 and Vite. Tailwind CSS handles styling.
- Backend uses FastAPI and SQLAlchemy connected to PostgreSQL (see `postgres-docs.md` for local setup).
- High score endpoints: `GET /api/scores` returns top 10 scores; `POST /api/scores` accepts `{ initials, score }`.

## 8. Success Metrics
- Game maintains a steady frame rate (target 60 FPS) across modern browsers.
- High scores persist across sessions and display correctly.
- Players can complete at least three levels with increasing difficulty.

## 9. Open Questions
- Are there specific score thresholds for awarding extra lives?
- Should Power Pellet duration vary as levels increase?

## 10. Referenced PRD-background files
- `.project-management/current-prd/prd-background/feature-specification.md` – comprehensive gameplay specification.
- `.project-management/current-prd/prd-background/design-mock.html` – layout and styling reference.
- `.project-management/current-prd/prd-background/postgres-docs.md` – local PostgreSQL setup instructions.
