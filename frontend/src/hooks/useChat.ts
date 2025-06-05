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

  const deleteChat = async (chatId: string) => {
    const previous = [...chats];
    setChats(prev => prev.filter(c => c.id !== chatId));
    try {
      await api.deleteChat(chatId, activeChatId);
      if (activeChatId === chatId) {
        const remaining = previous.filter(c => c.id !== chatId);
        setActiveChatId(remaining.length ? remaining[0].id : null);
      }
      // Ensure UI matches backend state after deletion
      await loadChats();
    } catch (err) {
      setChats(previous);
      throw err;
    }
  };

  const createChat = async (title: string | null = null) => {
    const chat = await api.post<Chat>('/chats/', { title });
    addChat(chat);
    setActiveChatId(chat.id);
    return chat;
  };

  useEffect(() => {
    void loadChats();
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return {
    chats,
    setChats,
    addChat,
    createChat,
    deleteChat,
    loadChats,
    activeChatId,
    activeChat,
    selectChat,
  };
}
