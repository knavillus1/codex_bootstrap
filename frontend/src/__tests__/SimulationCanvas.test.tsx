import { render } from '@testing-library/react';
import SimulationCanvas from '../components/SimulationCanvas';
import { SimulationState } from '../types';

test('renders canvas element', () => {
  const state: SimulationState = { step: 0, organisms: [] };
  const { container } = render(<SimulationCanvas state={state} />);
  const canvas = container.querySelector('canvas');
  expect(canvas).toBeInTheDocument();
  expect(canvas?.getAttribute('width')).toBe('500');
});
