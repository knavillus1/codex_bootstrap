## Pre-Feature Development Project Tree
```
.
frontend
  eslint.config.js
  package.json
  package-lock.json
run_tests.sh
README.md
dev_init.sh
AGENTS.md
CHANGELOG.md
DEVELOPMENT.md
backend
  requirements.txt
```

## Relevant Files
- `.project-management/prd-background/design-mockup.html` - Layout reference for UI components.
- `.project-management/prd-background/environment-setup-postgres.md` - Guidance on local PostgreSQL setup.
- `.project-management/prd-background/feature-request.md` - Details deck, card, and study functionality.

### Proposed New Files
- `backend/main.py` - FastAPI application entry point and API routing.
- `backend/models.py` - SQLAlchemy models for users, decks, and cards.
- `backend/auth.py` - User registration and login logic with session cookies.
- `backend/database.py` - Database connection utilities.
- `frontend/src/App.jsx` - React entry with routing configuration.
- `frontend/src/pages/Login.jsx` - Login and registration page.
- `frontend/src/pages/DeckList.jsx` - Deck management interface.
- `frontend/src/pages/Study.jsx` - Study mode interface.

### New and Updated Files
- `backend/main.py` - FastAPI app with startup table creation and health endpoint.
- `backend/database.py` - Async engine and session provider.
- `backend/models.py` - SQLAlchemy models for users, decks, and cards.
- `backend/tests/test_app.py` - Basic health endpoint test.
- `backend/__init__.py` - Marks backend as a package.
- `backend/requirements.txt` - Added SQLAlchemy and asyncpg dependencies.
- `backend/auth.py` - User registration and login logic with in-memory sessions.
- `backend/tests/test_auth.py` - Tests for registration and login endpoints.
- `backend/decks.py` - CRUD endpoints for decks using in-memory store.
- `backend/tests/test_decks.py` - Tests for deck API operations.
- `backend/cards.py` - CRUD endpoints for cards using in-memory store.
- `backend/tests/test_cards.py` - Tests for card API operations.
- `frontend/index.html` - HTML entry point for Vite app.
- `frontend/src/main.jsx` - React DOM rendering and router setup.
- `frontend/src/App.jsx` - Application routes and navigation.
- `frontend/src/pages/Login.jsx` - Login and registration form.
- `frontend/src/pages/DeckList.jsx` - Deck management page.

### Existing Files Modified
- `dev_init.sh` - Update to install dependencies and start backend/frontend for local dev.
- `frontend/package.json` - Add scripts and dependencies for React project.
- `backend/requirements.txt` - Include FastAPI, SQLAlchemy, and async PG driver.
- `frontend/eslint.config.js` - Enable linting for JS and JSX files.

### Notes
- Unit tests should typically be placed alongside the code files they are testing (e.g., `Login.tsx` and `Login.test.tsx`).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks
- [x] 1.0 Initialize FastAPI backend with PostgreSQL
  - [x] 1.1 Create `backend/main.py` and configure FastAPI instance
  - [x] 1.2 Add `backend/database.py` for SQLAlchemy connection to Postgres
  - [x] 1.3 Define `User`, `Deck`, and `Card` models in `backend/models.py`
  - [x] 1.4 Set up migration or table creation logic
- [x] 2.0 Implement user authentication
  - [x] 2.1 Build registration and login endpoints in `backend/auth.py`
  - [x] 2.2 Store password hashes and manage session cookies
  - [x] 2.3 Create frontend `Login.tsx` for user signup/login
- [x] 3.0 Deck management features
  - [x] 3.1 API endpoints for creating, reading, updating, and deleting decks
  - [x] 3.2 Frontend `DeckList.tsx` page for deck CRUD operations
- [x] 4.0 Card management features
  - [x] 4.1 API endpoints for adding, editing, and deleting cards in a deck
  - [x] 4.2 UI components for card forms within `DeckList.tsx`
- [ ] 5.0 Study mode implementation
  - [ ] 5.1 Frontend `Study.tsx` to display one card at a time
  - [ ] 5.2 Include card flip navigation and progress indicator
  - [ ] 5.3 Ensure only the logged-in user's decks are accessible
