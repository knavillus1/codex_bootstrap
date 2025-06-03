from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_deck_crud():
    client.post("/register", json={"username": "bob", "password": "pw"})
    client.post("/login", json={"username": "bob", "password": "pw"})
    # create deck
    resp = client.post('/decks/', json={'name': 'My Deck'})
    assert resp.status_code == 200
    data = resp.json()
    deck_id = data['id']
    assert data['name'] == 'My Deck'

    # list decks
    resp = client.get('/decks/')
    assert resp.status_code == 200
    assert any(d['id'] == deck_id for d in resp.json())

    # update deck
    resp = client.put(f'/decks/{deck_id}', json={'name': 'Updated'})
    assert resp.status_code == 200
    assert resp.json()['name'] == 'Updated'

    # delete deck
    resp = client.delete(f'/decks/{deck_id}')
    assert resp.status_code == 200
    assert resp.json() == {'status': 'deleted'}
