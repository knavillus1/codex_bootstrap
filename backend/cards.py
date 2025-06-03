from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from .auth import get_current_user
from .decks import _decks

router = APIRouter(prefix="/decks/{deck_id}/cards")

# in-memory store: {deck_id: {card_id: {front, back}}}
_cards = {}
_next_id = 1


class CardIn(BaseModel):
    front: str
    back: str


class CardOut(CardIn):
    id: int


@router.post('/', response_model=CardOut)
async def create_card(
    deck_id: int,
    card: CardIn,
    user: str = Depends(get_current_user),
):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    global _next_id
    deck_cards = _cards.setdefault(deck_id, {})
    card_id = _next_id
    _next_id += 1
    deck_cards[card_id] = card.dict()
    return {"id": card_id, **card.dict()}


@router.get('/', response_model=list[CardOut])
async def list_cards(deck_id: int, user: str = Depends(get_current_user)):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    deck_cards = _cards.get(deck_id, {})
    return [{"id": cid, **data} for cid, data in deck_cards.items()]


@router.put('/{card_id}', response_model=CardOut)
async def update_card(
    deck_id: int,
    card_id: int,
    card: CardIn,
    user: str = Depends(get_current_user),
):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    deck_cards = _cards.get(deck_id, {})
    if card_id not in deck_cards:
        raise HTTPException(status_code=404, detail="Card not found")
    deck_cards[card_id] = card.dict()
    return {"id": card_id, **card.dict()}


@router.delete('/{card_id}')
async def delete_card(
    deck_id: int,
    card_id: int,
    user: str = Depends(get_current_user),
):
    if deck_id not in _decks or _decks[deck_id]["owner"] != user:
        raise HTTPException(status_code=404, detail="Deck not found")
    deck_cards = _cards.get(deck_id, {})
    if card_id not in deck_cards:
        raise HTTPException(status_code=404, detail="Card not found")
    del deck_cards[card_id]
    return {"status": "deleted"}
