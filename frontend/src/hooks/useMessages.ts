import { useState } from 'react';
import type { Message, File } from '../types/message';
import { api } from '../services/api';

export default function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const loadMessages = async (chatId: string) => {
    const data = await api.get<Message[]>(`/messages/${chatId}`);
    setMessages(data);
  };

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
    // Accept both user and assistant messages from backend
    const result = await api.post<{ user: Message; assistant?: Message }>('/messages/', payload);
    // Optimistically add both messages to local state for instant UI feedback
    setMessages(prev =>
      result.assistant
        ? [...prev, result.user, result.assistant]
        : [...prev, result.user]
    );
  };
  return { messages, setMessages, loadMessages, sendMessage };
}
