import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatListItem from '../../components/ChatListItem';
import type { Chat } from '../../types/chat';

describe('ChatListItem', () => {
  const chat: Chat = {
    id: '1',
    title: 'Chat 1',
    created_at: '',
    last_activity: '',
    message_count: 0,
    messages: [],
  };

  it('shows menu on hover and handles actions', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onDelete = vi.fn();
    render(<ChatListItem chat={chat} active={false} onSelect={onSelect} onDelete={onDelete} />);
    await act(async () => {
      await user.hover(screen.getByText('Chat 1'));
    });
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /open chat menu/i }));
    });
    const del = await screen.findByRole('button', { name: 'Delete' });
    await act(async () => {
      await user.click(del);
    });
    expect(onDelete).toHaveBeenCalledWith('1');
    await user.click(screen.getByText('Chat 1'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('disables delete when active', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<ChatListItem chat={chat} active onSelect={() => {}} onDelete={onDelete} />);
    await act(async () => {
      await user.hover(screen.getByText('Chat 1'));
    });
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /open chat menu/i }));
    });
    const btn = await screen.findByRole('button', { name: 'Delete' });
    expect(btn).toBeDisabled();
  });
});
