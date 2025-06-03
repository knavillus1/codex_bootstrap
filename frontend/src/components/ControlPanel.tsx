import React from 'react';

interface Props {
  onReset: () => Promise<void>;
  onStep: () => Promise<void>;
}

const ControlPanel: React.FC<Props> = ({ onReset, onStep }) => {

  return (
    <div className="control-panel">
      <button onClick={onReset}>Reset</button>
      <button onClick={onStep}>Step</button>
    </div>
  );
};

export default ControlPanel;
