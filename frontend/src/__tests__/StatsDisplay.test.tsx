import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../api';
import StatsDisplay from '../components/StatsDisplay';

vi.mock('../api');

test('loads and displays stats', async () => {
  (api.fetchStats as any).mockResolvedValue({ step: 1, counts: { algae: 2 } });

  render(<StatsDisplay />);
  await waitFor(() => screen.getByText(/algae/i));

  expect(screen.getByText('Step: 1')).toBeInTheDocument();
  expect(screen.getByText(/algae: 2/)).toBeInTheDocument();
});
