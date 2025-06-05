import { render, screen } from '@testing-library/react';
import type { Chat } from '../../types/chat';
import ChatArea from '../../components/ChatArea';

type UseMessagesReturn = {
  messages: any[];
  loadMessages: () => Promise<void>;
  sendMessage: () => Promise<void>;
};

vi.mock('../../hooks/useMessages', () => {
  const useMessages = (): UseMessagesReturn => ({
    messages: [],
    loadMessages: vi.fn(),
    sendMessage: vi.fn(),
  });
  return { default: useMessages };
});

describe('ChatArea', () => {
  it('renders placeholder when no chat selected', () => {
    render(<ChatArea activeChat={null} />);
    expect(screen.getByText(/select a chat/i)).toBeInTheDocument();
  });

  it('shows chat title when active chat provided', () => {
    const chat: Chat = {
      id: '1',
      title: 'Test Chat',
      created_at: '',
      last_activity: '',
      message_count: 0,
      messages: [],
    };
    render(<ChatArea activeChat={chat} />);
    expect(screen.getByRole('heading', { name: 'Test Chat' })).toBeInTheDocument();
  });
});
