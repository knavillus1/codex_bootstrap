import React, { useEffect, useRef, useState } from 'react';
import useMessages from '../hooks/useMessages';
import useStream from '../hooks/useStream';
import type { Chat } from '../types/chat';
import type { Message } from '../types/message';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { api } from '../services/api';

interface Props {
  activeChat: Chat | null;
}

export default function ChatArea({ activeChat }: Props) {
  const { messages, setMessages, loadMessages, sendMessage } = useMessages();
  const { sendStream } = useStream();
  const [loading, setLoading] = useState(false);
  const [partial, setPartial] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat) {
      void loadMessages(activeChat.id);
    }
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, partial]);

  const handleSend = async (content: string) => {
    if (!activeChat) return;
    
    // Create optimistic user message and add it immediately to UI
    const userMessage: Message = {
      id: `temp-${Date.now()}`, // Temporary ID
      chat_id: activeChat.id,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };
    
    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    setPartial('');
    await sendStream(
      activeChat.id,
      content,
      data => {
        setPartial(prev => prev + data);
      },
      async () => {
        await loadMessages(activeChat.id);
        setLoading(false);
        setPartial('');
      }
    );
  };

  const handleFileUpload = async (file: File) => {
    if (!activeChat) return;
    
    // Create optimistic user message and add it immediately to UI
    const userMessage: Message = {
      id: `temp-file-${Date.now()}`, // Temporary ID for file uploads
      chat_id: activeChat.id,
      role: 'user',
      content: `Uploaded file: ${file.name}`,
      created_at: new Date().toISOString(),
    };
    
    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    
    try {
      // Upload the file first
      const response = await api.postFile<{ filename: string }>('/files/', file);
      
      // Create file attachment object with relative URL (backend expects relative paths)
      const fileAttachment = {
        filename: response.filename,
        content_type: file.type,
        url: `/files/${response.filename}` // Use relative URL for backend compatibility
      };
      
      // Send message to backend - this will replace the optimistic message with real data
      await sendMessage(activeChat.id, `Uploaded file: ${file.name}`, 'user', fileAttachment);
      
      // Reload messages to get the final state with proper IDs and file data
      await loadMessages(activeChat.id);
    } catch (error) {
      console.error('File upload failed:', error);
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
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
        {partial && (
          <MessageBubble
            message={{
              id: 'streaming',
              chat_id: activeChat.id,
              role: 'assistant',
              content: partial,
              created_at: new Date().toISOString(),
            }}
          />
        )}
        {loading && !partial && (
          <div className="text-sm text-gray-500">AI is typing…</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} onUpload={handleFileUpload} loading={loading} />
    </main>
  );
}
