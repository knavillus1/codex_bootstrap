import { useEffect, useState } from 'react';
import type { Chat } from '../types/chat';
import { api } from '../services/api';

export default function useChat(initialChats: Chat[] = []) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const loadChats = async () => {
    const data = await api.get<Chat[]>('/chats/');
    setChats(data);
    if (data.length && !activeChatId) {
      setActiveChatId(data[0].id);
    }
  };

  const selectChat = (chatId: string) => setActiveChatId(chatId);

  const addChat = (chat: Chat) => setChats(prev => [...prev, chat]);

  useEffect(() => {
    void loadChats();
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return {
    chats,
    setChats,
    addChat,
    loadChats,
    activeChatId,
    activeChat,
    selectChat,
  };
}
