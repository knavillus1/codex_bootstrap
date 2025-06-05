import React from 'react';
import type { Chat } from '../types/chat';
import ChatListItem from './ChatListItem';

interface Props {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

export default function Sidebar({ chats, activeChatId, onSelect, onNewChat, onDeleteChat }: Props) {
  return (
    <aside className="w-full sm:w-72 bg-[var(--color-bg-sidebar)] border-b sm:border-b-0 sm:border-r border-[var(--color-border-subtle)] p-4 flex flex-col">
      <button
        className="mb-4 px-4 py-2 bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] rounded-lg hover:bg-[var(--color-button-primary-bg)]/90 transition-colors font-semibold shadow-subtle"
        onClick={onNewChat}
      >
        New Chat
      </button>
      <div className="overflow-y-auto space-y-2">
        {chats.length === 0 ? (
          <p className="text-sm text-center text-gray-500">No chats available</p>
        ) : (
          chats.map(chat => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              active={chat.id === activeChatId}
              onSelect={onSelect}
              onDelete={onDeleteChat}
            />
          ))
        )}
      </div>
    </aside>
  );
}
