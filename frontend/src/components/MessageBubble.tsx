import React from 'react';
import type { Message } from '../types/message';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`my-1 max-w-xs px-3 py-2 rounded ${
        isUser ? 'bg-secondary self-end' : 'bg-accent self-start'
      }`}
    >
      {message.content}
    </div>
  );
}
