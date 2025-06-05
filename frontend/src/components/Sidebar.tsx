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
    <aside className="w-full sm:w-72 bg-[var(--color-bg-sidebar)] border-b sm:border-b-0 sm:border-r border-[var(--color-border-subtle)] p-4 flex flex-col">
      <button
        className="mb-4 px-4 py-2 bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] rounded-lg hover:bg-[var(--color-button-primary-bg)]/90 transition-colors font-semibold shadow-subtle"
        onClick={onNewChat}
      >
        New Chat
      </button>
      <div className="overflow-y-auto">
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`block w-full text-left mb-2 px-3 py-2 rounded-lg transition-colors font-medium ${
              chat.id === activeChatId
                ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)]'
                : 'hover:bg-gray-100 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
