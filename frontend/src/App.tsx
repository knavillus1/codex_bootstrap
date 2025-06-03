import React from 'react';
import SimulationCanvas from './components/SimulationCanvas';
import ControlPanel from './components/ControlPanel';
import StatsDisplay from './components/StatsDisplay';

const App: React.FC = () => (
  <div className="app-container">
    <h1>Ecosystem Simulation</h1>
    <SimulationCanvas />
    <ControlPanel />
    <StatsDisplay />
  </div>
);

export default App;
