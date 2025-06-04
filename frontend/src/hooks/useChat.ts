import { useState } from 'react';
import type { Chat } from '../types/chat';

export default function useChat(initialChats: Chat[] = []) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const addChat = (chat: Chat) => setChats(prev => [...prev, chat]);
  return { chats, setChats, addChat };
}
