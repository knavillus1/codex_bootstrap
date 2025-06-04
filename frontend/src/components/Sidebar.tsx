import React from 'react';
import type { Chat } from '../types/chat';

interface Props {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({ chats, activeChatId, onSelect, onNewChat }: Props) {
  return (
    <aside className="w-1/4 border-r p-4">
      <button
        className="mb-4 px-2 py-1 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
        onClick={onNewChat}
      >
        New Chat
      </button>
      {chats.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`block w-full text-left mb-2 rounded hover:bg-secondary/20 transition-colors ${chat.id === activeChatId ? 'font-bold' : ''}`}
        >
          {chat.title}
        </button>
      ))}
    </aside>
  );
}
