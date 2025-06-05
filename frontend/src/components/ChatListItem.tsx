import React, { useState } from 'react';
import type { Chat } from '../types/chat';
import ChatManagementMenu from './ChatManagementMenu';

interface Props {
  chat: Chat;
  active: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ChatListItem({ chat, active, onSelect, onDelete }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)]'
          : 'hover:bg-gray-100 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button onClick={() => onSelect(chat.id)} className="flex-1 text-left">
        {chat.title}
      </button>
      {hover && (
        <ChatManagementMenu
          onDelete={() => onDelete(chat.id)}
          disableDelete={active}
        />
      )}
    </div>
  );
}
