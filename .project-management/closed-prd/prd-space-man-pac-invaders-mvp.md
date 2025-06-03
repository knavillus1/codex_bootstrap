## 1. Introduction/Overview
Space Man Pac Invaders combines Pac-Man and Space Invaders mechanics into a retro arcade browser game. The goal is to collect energy pellets within a maze while avoiding or destroying descending invader aliens. Persistent high scores are stored in a local PostgreSQL database.

## 2. Goals
1. Provide a fully playable MVP entirely in the browser.
2. Implement the core gameplay loop with simple shapes for characters, matching `design-mock.html` layout.
3. Store and display high scores using a local PostgreSQL instance.

## 3. User Stories
- **As a player**, I want to move Space Man Pac around the maze collecting energy pellets so that I can clear levels and earn points.
- **As a player**, I want to shoot upward at invaders and avoid their shots so that I do not lose lives.
- **As a player**, I want to see my score accumulate and submit my initials if it ranks in the top 10.
- **As a returning player**, I want the game to show the persistent high score table so I can compare my score with previous runs.

## 4. Functional Requirements
1. The system must render the maze, player, pellets, invaders, and projectiles using HTML5 Canvas inside React components.
2. The player must be able to move in four directions with the arrow keys and shoot with the space bar.
3. Invaders must march horizontally, reverse at maze walls, descend one row when reversing, and fire projectiles downward.
4. Collision detection must handle player vs. invader, player vs. projectile, player projectile vs. invader, and player vs. pellets.
5. Collecting all energy pellets must advance the level and increase invader difficulty.
6. Power pellets must temporarily allow Space Man Pac to eat invaders for bonus points.
7. The game must track lives, scores, and levels, displaying appropriate game states (title, get ready, playing, player death, game over).
8. Upon game over, if the score is in the top 10, the player must be prompted to enter three initials.
9. The frontend must send high score submissions to a FastAPI endpoint which stores them in PostgreSQL.
10. A high score screen must retrieve and display the top 10 scores from the backend.

## 5. Non-Goals (Out of Scope)
- Advanced invader behaviors or varied enemy types beyond the basic marching formation.
- Multiple maze layouts or difficulty settings beyond basic speed increases.
- Additional power-ups or multiplayer modes.

## 6. Design Considerations (Optional)
- Follow the retro pixel-art aesthetic specified in `design-mock.html`. Use simple shapes as placeholders for characters so that sprite artwork can be added later.
- Use Tailwind CSS for layout around the canvas as demonstrated in the mockup.

## 7. Technical Considerations (Optional)
- React with Vite for the frontend and FastAPI for backend APIs.
- Local PostgreSQL used through a FastAPI service for high score persistence; see `postgres-docs.md` for setup guidance.
- Separate frontend and backend directories to facilitate future expansion.

## 8. Success Metrics
- MVP is playable from the browser with responsive controls and increasing difficulty.
- High scores persist between sessions and display correctly.
- Visual layout matches `design-mock.html` and all features listed in this PRD function as described.

## 9. Open Questions
- How many invaders should exist in the initial formation for the first level?
- What exact timing/duration should power pellets grant invincibility?

## 10. Referenced PRD-background files
- `.project-management/current-prd/prd-background/design-mock.html` – official design mockup.
- `.project-management/current-prd/prd-background/postgres-docs.md` – instructions for local PostgreSQL setup.
