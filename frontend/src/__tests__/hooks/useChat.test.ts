import { act, renderHook, waitFor } from '@testing-library/react';
import useChat from '../../hooks/useChat';
import { api } from '../../services/api';

vi.mock('../../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('useChat', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads chats on mount', async () => {
    const chats = [{ id: '1', title: 'Chat', created: '', last_activity: '', message_count: 0 }];
    (api.get as unknown as any).mockResolvedValue(chats);
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/chats/'));
    expect(result.current.chats).toEqual(chats);
    expect(result.current.activeChatId).toBe('1');
  });

  it('creates chat and sets active', async () => {
    (api.get as unknown as any).mockResolvedValue([]);
    const chat = { id: '2', title: 'New', created: '', last_activity: '', message_count: 0 };
    (api.post as unknown as any).mockResolvedValue(chat);
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    await act(async () => {
      await result.current.createChat('New');
    });
    expect(api.post).toHaveBeenCalledWith('/chats/', { title: 'New' });
    expect(result.current.chats).toContainEqual(chat);
    expect(result.current.activeChatId).toBe('2');
  });
});
