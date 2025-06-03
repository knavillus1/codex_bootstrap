import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as api from '../api';
import App from '../App';

vi.mock('../api');

test('loads state on mount and handles step click', async () => {
  (api.fetchState as any).mockResolvedValue({ step: 0, organisms: [] });
  (api.fetchStats as any).mockResolvedValue({ step: 0, counts: {} });
  (api.stepSimulation as any).mockResolvedValue(1);
  render(<App />);
  await screen.findByText(/Ecosystem Simulation/);
  await userEvent.click(screen.getByText('Step'));
  expect(api.stepSimulation).toHaveBeenCalled();
});
