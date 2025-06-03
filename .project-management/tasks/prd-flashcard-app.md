## 1. Introduction/Overview
This project implements a flashcard study web application so the user's two children can create and review study decks.  The app will support basic deck and card management as well as study mode.  User login is required so each child has a separate account.  The initial guidance includes a PostgreSQL setup, but alternative methods can be used if they simplify development.

## 2. Goals
- Allow each child to create a personal account and log in/out.
- Provide CRUD (create, read, update, delete) operations for flashcard decks.
- Provide CRUD operations for cards within a deck.
- Offer a study mode to flip through cards one at a time.
- Persist all data in PostgreSQL.

## 3. User Stories
- *As a user, I want to sign up and log in so that my decks are private.*
- *As a user, I want to create new decks with a name and description so I can organize different subjects.*
- *As a user, I want to add, edit, and delete cards in my decks so I can keep the material accurate.*
- *As a user, I want to study a deck in flashcard mode so that I can flip cards and track my progress.*

## 4. Functional Requirements
1. The system must allow new users to register with a username and password.
2. The system must authenticate users on login and maintain a session.
3. The system must allow each logged-in user to create, view, edit, and delete their own decks.
4. The system must allow users to add, edit, and delete cards within a selected deck.
5. The system must display cards one at a time in study mode, with the ability to flip a card front/back and navigate next/previous.
6. The system must store decks and cards in PostgreSQL.
7. The system must prevent users from accessing or modifying another user's decks or cards.

## 5. Non-Goals (Out of Scope)
- Advanced spaced-repetition algorithms.
- Public sharing of decks between accounts.
- Mobile-specific native applications (web only).
- Analytics or tracking beyond simple success metrics.

## 6. Design Considerations (Optional)
The design mockup provided in `.project-management/prd-background/design-mockup.html` illustrates layout and color choices. Follow its structure for deck lists, card forms, and study view where practical.

## 7. Technical Considerations (Optional)
- Backend suggested stack is FastAPI with PostgreSQL. You may adjust setup as needed for local development.
- Keep authentication simple (e.g., session cookies).
- The provided PostgreSQL setup script (`.project-management/prd-background/environment-setup-postgres.md`) can be adapted if there is a simpler approach for running Postgres locally.

## 8. Success Metrics
- Each child can create an account and log in successfully.
- Decks and cards persist across sessions.
- Study mode works reliably without errors.
- Optional: track number of decks created or frequency of study sessions for later improvement.

## 9. Open Questions
- Should password reset functionality be included?
- Is email verification required or is a simple username/password sufficient?

## 10. Referenced PRD-background files
- `.project-management/prd-background/feature-request.md` – outlines core deck, card, and study functionality with stack suggestions.
- `.project-management/prd-background/environment-setup-postgres.md` – describes an example setup script for starting PostgreSQL.
- `.project-management/prd-background/design-mockup.html` – HTML mockup demonstrating desired UI layout and color palette.
