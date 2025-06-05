import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatManagementMenu from '../../components/ChatManagementMenu';

describe('ChatManagementMenu', () => {
  it('calls onDelete when delete clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<ChatManagementMenu onDelete={onDelete} />);
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /open chat menu/i }));
    });
    const delBtn = await screen.findByRole('button', { name: 'Delete' });
    await act(async () => {
      await user.click(delBtn);
    });
    expect(onDelete).toHaveBeenCalled();
  });

  it('disables delete button when disableDelete true', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<ChatManagementMenu onDelete={onDelete} disableDelete />);
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /open chat menu/i }));
    });
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });
});
