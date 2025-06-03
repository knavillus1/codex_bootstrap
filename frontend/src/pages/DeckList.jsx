import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [newName, setNewName] = useState('');
  const [editNames, setEditNames] = useState({});
  const [showCards, setShowCards] = useState({});
  const [cards, setCards] = useState({});
  const [newCards, setNewCards] = useState({});
  const [editCards, setEditCards] = useState({});

  const fetchDecks = async () => {
    const resp = await fetch('/decks/');
    if (resp.ok) {
      setDecks(await resp.json());
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const createDeck = async () => {
    const resp = await fetch('/decks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    if (resp.ok) {
      setNewName('');
      fetchDecks();
    }
  };

  const updateDeck = async (id) => {
    const name = editNames[id] || '';
    const resp = await fetch(`/decks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (resp.ok) {
      setEditNames((e) => ({ ...e, [id]: '' }));
      fetchDecks();
    }
  };

  const deleteDeck = async (id) => {
    const resp = await fetch(`/decks/${id}`, { method: 'DELETE' });
    if (resp.ok) {
      fetchDecks();
    }
  };

  const fetchCards = async (deckId) => {
    const resp = await fetch(`/decks/${deckId}/cards/`);
    if (resp.ok) {
      const list = await resp.json();
      setCards((c) => ({ ...c, [deckId]: list }));
    }
  };

  const createCard = async (deckId) => {
    const card = newCards[deckId] || { front: '', back: '' };
    const resp = await fetch(`/decks/${deckId}/cards/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    if (resp.ok) {
      setNewCards((n) => ({ ...n, [deckId]: { front: '', back: '' } }));
      fetchCards(deckId);
    }
  };

  const updateCard = async (deckId, cardId) => {
    const card = (editCards[deckId] && editCards[deckId][cardId]) || {
      front: '',
      back: '',
    };
    const resp = await fetch(`/decks/${deckId}/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    if (resp.ok) {
      setEditCards((e) => ({
        ...e,
        [deckId]: { ...(e[deckId] || {}), [cardId]: { front: '', back: '' } },
      }));
      fetchCards(deckId);
    }
  };

  const deleteCard = async (deckId, cardId) => {
    const resp = await fetch(`/decks/${deckId}/cards/${cardId}`, { method: 'DELETE' });
    if (resp.ok) {
      fetchCards(deckId);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Decks</h1>
      <div className="flex mb-4 gap-2">
        <input
          className="border p-1 flex-1"
          placeholder="New deck name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-2" onClick={createDeck}>
          Add
        </button>
      </div>
      <ul>
        {decks.map((d) => (
          <li key={d.id} className="mb-4 border p-2">
            <div className="flex items-center gap-2 mb-2">
              <input
                className="border p-1 flex-1"
                value={editNames[d.id] ?? d.name}
                onChange={(e) =>
                  setEditNames((cur) => ({ ...cur, [d.id]: e.target.value }))
                }
              />
              <button
                className="bg-green-500 text-white px-2"
                onClick={() => updateDeck(d.id)}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-2"
                onClick={() => deleteDeck(d.id)}
              >
                Delete
              </button>
              <Link to={`/study/${d.id}`} className="bg-purple-500 text-white px-2">
                Study
              </Link>
              <button
                className="bg-gray-500 text-white px-2"
                onClick={() => {
                  setShowCards((s) => ({ ...s, [d.id]: !s[d.id] }));
                  if (!showCards[d.id]) fetchCards(d.id);
                }}
              >
                {showCards[d.id] ? 'Hide Cards' : 'Cards'}
              </button>
            </div>
            {showCards[d.id] && (
              <div className="ml-4">
                <div className="flex gap-2 mb-2">
                  <input
                    className="border p-1 flex-1"
                    placeholder="Front"
                    value={newCards[d.id]?.front || ''}
                    onChange={(e) =>
                      setNewCards((n) => ({
                        ...n,
                        [d.id]: { ...(n[d.id] || {}), front: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="border p-1 flex-1"
                    placeholder="Back"
                    value={newCards[d.id]?.back || ''}
                    onChange={(e) =>
                      setNewCards((n) => ({
                        ...n,
                        [d.id]: { ...(n[d.id] || {}), back: e.target.value },
                      }))
                    }
                  />
                  <button
                    className="bg-blue-500 text-white px-2"
                    onClick={() => createCard(d.id)}
                  >
                    Add Card
                  </button>
                </div>
                <ul>
                  {(cards[d.id] || []).map((c) => (
                    <li key={c.id} className="mb-2 flex gap-2 items-center">
                      <input
                        className="border p-1 flex-1"
                        value={
                          (editCards[d.id] && editCards[d.id][c.id]?.front) ||
                          c.front
                        }
                        onChange={(e) =>
                          setEditCards((cur) => ({
                            ...cur,
                            [d.id]: {
                              ...(cur[d.id] || {}),
                              [c.id]: {
                                ...(cur[d.id]?.[c.id] || c),
                                front: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                      <input
                        className="border p-1 flex-1"
                        value={
                          (editCards[d.id] && editCards[d.id][c.id]?.back) ||
                          c.back
                        }
                        onChange={(e) =>
                          setEditCards((cur) => ({
                            ...cur,
                            [d.id]: {
                              ...(cur[d.id] || {}),
                              [c.id]: {
                                ...(cur[d.id]?.[c.id] || c),
                                back: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                      <button
                        className="bg-green-500 text-white px-2"
                        onClick={() => updateCard(d.id, c.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white px-2"
                        onClick={() => deleteCard(d.id, c.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckList;
