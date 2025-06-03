import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);
