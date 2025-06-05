import { useState } from 'react';
import type { Message, File } from '../types/message';
import { api } from '../services/api';

export default function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const loadMessages = async (chatId: string) => {
    const data = await api.get<Message[]>(`/messages/${chatId}`);
    setMessages(data);
  };

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const sendMessage = async (
    chatId: string,
    content: string,
    role: 'user' | 'assistant' = 'user',
    file?: File,
  ) => {
    const payload: any = {
      chat_id: chatId,
      role,
      content,
    };
    
    if (file) {
      payload.file = {
        filename: file.filename,
        content_type: file.content_type,
        url: file.url,
      };
    }
    
    // The backend now returns all messages for the chat
    const updatedMessages = await api.post<Message[]>('/messages/', payload);
    setMessages(updatedMessages); // Update state with the full list
    // No need to return msg specifically, as the state is updated
  };
  return { messages, setMessages, addMessage, loadMessages, sendMessage };
}
