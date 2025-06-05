import { act, renderHook } from '@testing-library/react';
import useMessages from '../../hooks/useMessages';
import { api } from '../../services/api';

vi.mock('../../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('useMessages', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads messages for a chat', async () => {
    const msgs = [{ id: '1', chat_id: 'c', role: 'user', content: 'hi', created_at: '' }];
    (api.get as unknown as any).mockResolvedValue(msgs);
    const { result } = renderHook(() => useMessages());
    await act(async () => {
      await result.current.loadMessages('c');
    });
    expect(api.get).toHaveBeenCalledWith('/messages/c');
    expect(result.current.messages).toEqual(msgs);
  });

  it('sends message and appends to list', async () => {
    const msg = { id: '2', chat_id: 'c', role: 'user', content: 'hello', created_at: '' };
    (api.post as unknown as any).mockResolvedValue({ user: msg });
    const { result } = renderHook(() => useMessages());
    await act(async () => {
      await result.current.sendMessage('c', 'hello');
    });
    expect(api.post).toHaveBeenCalledWith('/messages/', {
      chat_id: 'c',
      role: 'user',
      content: 'hello',
    });
    expect(result.current.messages).toContainEqual(msg);
  });
});
