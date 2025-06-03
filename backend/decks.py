from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from .auth import get_current_user

router = APIRouter(prefix="/decks")

# In-memory store
_decks = {}
_next_id = 1


class DeckIn(BaseModel):
    name: str


class DeckOut(DeckIn):
    id: int


@router.post("/", response_model=DeckOut)
async def create_deck(deck: DeckIn, user: str = Depends(get_current_user)):
    global _next_id
    deck_id = _next_id
    _next_id += 1
    _decks[deck_id] = {"owner": user, **deck.dict()}
    return {"id": deck_id, **deck.dict()}


@router.get("/", response_model=list[DeckOut])
async def list_decks(user: str = Depends(get_current_user)):
    return [{"id": i, **data}
            for i, data in _decks.items()
            if data.get("owner") == user]


@router.put("/{deck_id}", response_model=DeckOut)
async def update_deck(
    deck_id: int,
    deck: DeckIn,
    user: str = Depends(get_current_user),
):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    _decks[deck_id].update(deck.dict())
    return {"id": deck_id, **deck.dict()}


@router.delete("/{deck_id}")
async def delete_deck(
    deck_id: int,
    user: str = Depends(get_current_user),
):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    del _decks[deck_id]
    return {"status": "deleted"}
