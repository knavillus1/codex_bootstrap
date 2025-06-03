from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_card_crud():
    # create deck first
    resp = client.post('/decks/', json={'name': 'Deck1'})
    deck_id = resp.json()['id']

    # create card
    resp = client.post(f'/decks/{deck_id}/cards/', json={'front': 'a', 'back': 'b'})
    assert resp.status_code == 200
    card = resp.json()
    card_id = card['id']
    assert card['front'] == 'a'

    # list cards
    resp = client.get(f'/decks/{deck_id}/cards/')
    assert resp.status_code == 200
    assert any(c['id'] == card_id for c in resp.json())

    # update card
    resp = client.put(
        f'/decks/{deck_id}/cards/{card_id}',
        json={'front': 'c', 'back': 'd'}
    )
    assert resp.status_code == 200
    assert resp.json()['front'] == 'c'

    # delete card
    resp = client.delete(f'/decks/{deck_id}/cards/{card_id}')
    assert resp.status_code == 200
    assert resp.json() == {'status': 'deleted'}
