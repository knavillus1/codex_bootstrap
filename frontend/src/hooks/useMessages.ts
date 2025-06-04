import { useState } from 'react';
import type { Message } from '../types/message';
import { api } from '../services/api';

export default function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const loadMessages = async (chatId: string) => {
    const data = await api.get<Message[]>(`/messages/${chatId}`);
    setMessages(data);
  };

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);
  return { messages, setMessages, addMessage, loadMessages };
}
