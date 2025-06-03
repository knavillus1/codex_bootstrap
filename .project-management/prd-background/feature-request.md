# Flashcard Study App Functionality

**Core Goal:** Allow users to create decks of flashcards and study them.

## 1. Deck Management

*   **Create Deck:** Users can create a new deck by providing a name (e.g., "JavaScript Basics," "Spanish Vocabulary") and an optional description.
*   **View Decks:** A list of all created decks is displayed, showing their names and perhaps the number of cards in each.
*   **Select Deck:** Users can select a deck to either study its cards or manage its content.
*   **Edit Deck:** Users can change the name and description of an existing deck.
*   **Delete Deck:** Users can delete a deck (which will also delete all associated cards).

## 2. Card Management (within a selected deck)

*   **Add Card:** Within a deck, users can add new flashcards. Each card has a "Front" (e.g., a question, a term) and a "Back" (e.g., the answer, the definition).
*   **View Cards:** Users can see a list of all cards within a selected deck, showing their front and back content.
*   **Edit Card:** Users can modify the front or back content of an existing card.
*   **Delete Card:** Users can delete individual cards from a deck.

## 3. Study Mode (for a selected deck)

*   **Start Study Session:** User selects a deck and clicks "Study."
*   **Card Display:** One card is displayed at a time, initially showing only the "Front."
*   **Flip Card:** A button allows the user to "flip" the card to reveal the "Back." Clicking again could flip it back to the "Front."
*   **Navigation:**
    *   "Next Card": Moves to the next card in the deck.
    *   "Previous Card": Moves to the previous card.
    *   (Optional: Shuffle cards for the study session).
*   **Progress Indication:** Shows which card is currently being viewed (e.g., "Card 5 of 20").
*   **End Study Session:** User can exit the study mode and return to deck management.

## Technical Stack Considerations

*   **Backend:** FastAPI (Python) - Manages API endpoints for CRUD operations on decks and cards.
*   **Database:** PostgreSQL - Stores deck and card information.
    *   `decks` table (id, name, description, created_at, updated_at)
    *   `cards` table (id, deck_id, front_text, back_text, created_at, updated_at)
*   **Frontend:** React + Vite (TypeScript) - Handles user interface, interaction, and API calls.