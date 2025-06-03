import React, { useState, useEffect } from 'react';

const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [newName, setNewName] = useState('');
  const [editNames, setEditNames] = useState({});

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
          <li key={d.id} className="mb-2 border p-2 flex items-center gap-2">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckList;
