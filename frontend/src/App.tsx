import React, { useEffect, useState } from 'react';
import SimulationCanvas from './components/SimulationCanvas';
import ControlPanel from './components/ControlPanel';
import StatsDisplay from './components/StatsDisplay';
import { fetchState, resetSimulation, stepSimulation } from './api';
import { SimulationState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<SimulationState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadState = async () => {
    try {
      const s = await fetchState();
      setState(s);
      setError(null);
    } catch {
      setError('Failed to fetch state');
    }
  };

  useEffect(() => {
    loadState();
    const id = setInterval(loadState, 1000);
    return () => clearInterval(id);
  }, []);

  const handleReset = async () => {
    try {
      await resetSimulation();
      await loadState();
    } catch {
      setError('Failed to reset simulation');
    }
  };

  const handleStep = async () => {
    try {
      await stepSimulation();
      await loadState();
    } catch {
      setError('Failed to advance simulation');
    }
  };

  return (
    <div className="app-container">
      <h1>Ecosystem Simulation</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SimulationCanvas state={state} />
      <ControlPanel onReset={handleReset} onStep={handleStep} />
      <StatsDisplay />
    </div>
  );
};

export default App;
