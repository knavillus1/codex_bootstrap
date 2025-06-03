import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlPanel from '../components/ControlPanel';

test('calls handlers when buttons clicked', async () => {
  const onReset = vi.fn();
  const onStep = vi.fn();
  render(<ControlPanel onReset={onReset} onStep={onStep} />);

  await userEvent.click(screen.getByText(/Reset/i));
  expect(onReset).toHaveBeenCalled();

  await userEvent.click(screen.getByText(/Step/i));
  expect(onStep).toHaveBeenCalled();
});
