import React from 'react';
import { resetSimulation, stepSimulation } from '../api';

const ControlPanel: React.FC = () => {
  const handleReset = async () => {
    await resetSimulation();
  };

  const handleStep = async () => {
    await stepSimulation();
  };

  return (
    <div className="control-panel">
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStep}>Step</button>
    </div>
  );
};

export default ControlPanel;
