from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/decks")

# In-memory store
_decks = {}
_next_id = 1


class DeckIn(BaseModel):
    name: str


class DeckOut(DeckIn):
    id: int


@router.post("/", response_model=DeckOut)
async def create_deck(deck: DeckIn):
    global _next_id
    deck_id = _next_id
    _next_id += 1
    _decks[deck_id] = deck.dict()
    return {"id": deck_id, **deck.dict()}


@router.get("/", response_model=list[DeckOut])
async def list_decks():
    return [{"id": i, **d} for i, d in _decks.items()]


@router.put("/{deck_id}", response_model=DeckOut)
async def update_deck(deck_id: int, deck: DeckIn):
    if deck_id not in _decks:
        raise HTTPException(status_code=404, detail="Deck not found")
    _decks[deck_id] = deck.dict()
    return {"id": deck_id, **deck.dict()}


@router.delete("/{deck_id}")
async def delete_deck(deck_id: int):
    if deck_id not in _decks:
        raise HTTPException(status_code=404, detail="Deck not found")
    del _decks[deck_id]
    return {"status": "deleted"}
