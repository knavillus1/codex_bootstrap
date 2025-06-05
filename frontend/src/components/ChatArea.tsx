import React, { useEffect, useRef, useState } from 'react';
import useMessages from '../hooks/useMessages';
import type { Chat } from '../types/chat';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { api } from '../services/api';

interface Props {
  activeChat: Chat | null;
}

export default function ChatArea({ activeChat }: Props) {
  const { messages, loadMessages, sendMessage } = useMessages();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat) {
      void loadMessages(activeChat.id);
    }
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (content: string) => {
    if (!activeChat) return;
    setLoading(true);
    await sendMessage(activeChat.id, content);
    // placeholder for AI response
    setLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    if (!activeChat) return;
    
    // Upload the file first
    const response = await api.postFile<{ filename: string }>('/files/', file);
    
    // Create a message with the file attachment
    const fileAttachment = {
      filename: response.filename,
      content_type: file.type,
      url: `/files/${response.filename}` // Assuming files can be accessed via this URL
    };
    
    await sendMessage(activeChat.id, `Uploaded file: ${file.name}`, 'user', fileAttachment);
  };

  if (!activeChat) {
    return <div className="flex-1 p-4">Select a chat to begin</div>;
  }

  return (
    <main className="flex-1 p-4 flex flex-col bg-[var(--color-bg-main)]">
      <h1 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">{activeChat.title}</h1>
      <div className="flex-1 flex flex-col space-y-3 overflow-y-auto p-2">
        {messages.map(m => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {loading && <div className="text-sm text-gray-500">AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} onUpload={handleFileUpload} loading={loading} />
    </main>
  );
}
