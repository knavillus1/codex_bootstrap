import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  test('adds numbers', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByLabelText('input-a'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-b'), { target: { value: '3' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByLabelText('result')).toHaveTextContent('5');
  });

  test('handles division by zero', () => {
    render(<Calculator />);
    fireEvent.change(screen.getByLabelText('input-a'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-b'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('operation'), { target: { value: 'divide' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByRole('alert')).toHaveTextContent(/division by zero/i);
  });
});
