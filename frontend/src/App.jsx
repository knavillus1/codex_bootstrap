import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import DeckList from './pages/DeckList';
import Study from './pages/Study';

const App = () => (
  <>
    <header>
      <h1>Flashcard Study App</h1>
    </header>
    <div className="container">
      <nav>
        <Link to="/decks">My Decks</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/decks" element={<DeckList />} />
        <Route path="/study/:deckId" element={<Study />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  </>
);

export default App;
