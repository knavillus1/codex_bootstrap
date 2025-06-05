import { act, renderHook, waitFor } from '@testing-library/react';
import useChat from '../../hooks/useChat';
import { api } from '../../services/api';

vi.mock('../../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    deleteChat: vi.fn(),
  },
}));

describe('useChat', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads chats on mount', async () => {
    const chats = [{ id: '1', title: 'Chat', created_at: '', last_activity: '', message_count: 0, messages: [] }];
    (api.get as unknown as any).mockResolvedValue(chats);
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/chats/'));
    expect(result.current.chats).toEqual(chats);
    expect(result.current.activeChatId).toBe('1');
  });

  it('creates chat and sets active', async () => {
    (api.get as unknown as any).mockResolvedValue([]);
    const chat = { id: '2', title: 'New', created_at: '', last_activity: '', message_count: 0, messages: [] };
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

  it('deletes chat and updates state', async () => {
    const chats = [
      { id: '1', title: 'Chat', created_at: '', last_activity: '', message_count: 0, messages: [] },
      { id: '2', title: 'Chat2', created_at: '', last_activity: '', message_count: 0, messages: [] },
    ];
    (api.get as unknown as any).mockResolvedValue(chats);
    const { result } = renderHook(() => useChat(chats));
    await waitFor(() => expect(result.current.activeChatId).toBe("1"));
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    (api.deleteChat as unknown as any).mockResolvedValue(undefined);
    await act(async () => {
      await result.current.deleteChat('1');
    });
    expect(api.deleteChat).toHaveBeenCalledWith('1', "1");
    expect(result.current.chats.length).toBe(1);
  });

  it('rolls back on delete failure', async () => {
    const chats = [
      { id: '1', title: 'Chat', created_at: '', last_activity: '', message_count: 0, messages: [] },
    ];
    (api.get as unknown as any).mockResolvedValue(chats);
    const { result } = renderHook(() => useChat(chats));
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    (api.deleteChat as unknown as any).mockRejectedValue(new Error('fail'));
    await expect(result.current.deleteChat('1')).rejects.toThrow('fail');
    expect(result.current.chats.length).toBe(1);
  });
});
