import { useState } from 'react';
import type { Message } from '../types/message';

export default function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);
  return { messages, setMessages, addMessage };
}
