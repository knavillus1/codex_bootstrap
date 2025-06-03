from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

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
async def create_card(deck_id: int, card: CardIn):
    global _next_id
    deck_cards = _cards.setdefault(deck_id, {})
    card_id = _next_id
    _next_id += 1
    deck_cards[card_id] = card.dict()
    return {"id": card_id, **card.dict()}


@router.get('/', response_model=list[CardOut])
async def list_cards(deck_id: int):
    deck_cards = _cards.get(deck_id, {})
    return [{"id": cid, **data} for cid, data in deck_cards.items()]


@router.put('/{card_id}', response_model=CardOut)
async def update_card(deck_id: int, card_id: int, card: CardIn):
    deck_cards = _cards.get(deck_id, {})
    if card_id not in deck_cards:
        raise HTTPException(status_code=404, detail="Card not found")
    deck_cards[card_id] = card.dict()
    return {"id": card_id, **card.dict()}


@router.delete('/{card_id}')
async def delete_card(deck_id: int, card_id: int):
    deck_cards = _cards.get(deck_id, {})
    if card_id not in deck_cards:
        raise HTTPException(status_code=404, detail="Card not found")
    del deck_cards[card_id]
    return {"status": "deleted"}
