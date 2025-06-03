import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import DeckList from './pages/DeckList';
import Study from './pages/Study';

const App = () => (
  <div className="min-h-screen p-4">
    <nav className="mb-4">
      <Link to="/login" className="mr-4">Login</Link>
      <Link to="/decks">Decks</Link>
    </nav>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/decks" element={<DeckList />} />
      <Route path="/study/:deckId" element={<Study />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
);

export default App;
