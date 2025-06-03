import React, { useEffect, useRef } from 'react';
import { SimulationState } from '../types';

interface Props {
  state: SimulationState | null;
}
const CANVAS_SIZE = 500;

const SimulationCanvas: React.FC<Props> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const scaleX = CANVAS_SIZE / 500;
    const scaleY = CANVAS_SIZE / 500;

    state.organisms.forEach((o) => {
      let color = 'black';
      if (o.type === 'algae') color = 'var(--color-algae)';
      if (o.type === 'herbivore') color = 'var(--color-herbivore)';
      if (o.type === 'carnivore') color = 'var(--color-carnivore)';

      const radius = Math.max(2, o.size * 5);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(o.position[0] * scaleX, o.position[1] * scaleY, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-canvas"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    />
  );
};

export default SimulationCanvas;
