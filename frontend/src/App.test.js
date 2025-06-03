import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator', () => {
  render(<App />);
  expect(screen.getByText(/calculate/i)).toBeInTheDocument();
});
