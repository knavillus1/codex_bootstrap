import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Study = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const load = async () => {
      const resp = await fetch(`/decks/${deckId}/cards/`);
      if (resp.ok) {
        setCards(await resp.json());
      }
    };
    load();
  }, [deckId]);

  if (!cards.length) {
    return <p className="text-center">No cards to study</p>;
  }

  const card = cards[index];
  const next = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, cards.length - 1));
  };
  const prev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-2">Study</h1>
      <p className="mb-2">Card {index + 1} of {cards.length}</p>
      <div
        className="border p-4 mb-4 cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
      >
        {flipped ? card.back : card.front}
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={prev} disabled={index === 0} className="px-2 border">
          Prev
        </button>
        <button onClick={() => setFlipped((f) => !f)} className="px-2 border">
          Flip
        </button>
        <button onClick={next} disabled={index === cards.length - 1} className="px-2 border">
          Next
        </button>
      </div>
      <Link to="/decks" className="block mt-4 underline">
        Back to Decks
      </Link>
    </div>
  );
};

export default Study;
