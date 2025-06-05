import React from 'react';
import type { Message } from '../types/message';
import { formatTimestamp } from '../utils/dateUtils';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  
  const renderFileAttachment = () => {
    if (!message.file) return null;
    
    const { filename, content_type, url } = message.file;
    const isImage = content_type.startsWith('image/');
    
    if (isImage && url) {
      return (
        <div className="mt-2">
          <img
            src={url}
            alt={filename}
            className="max-w-full max-h-48 rounded-lg border border-[var(--color-border-subtle)] shadow-subtle"
            style={{ maxWidth: '200px', maxHeight: '150px' }}
          />
        </div>
      );
    } else {
      return (
        <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
          <div className="flex items-center">
            <span className="mr-2">📄</span>
            <span>{filename}</span>
          </div>
        </div>
      );
    }
  };
  
  // Helper to render OpenAI-style content (string or array of parts)
  const renderContent = (content: Message["content"]) => {
    if (typeof content === 'string') return <span>{content}</span>;
    // If content is an array, render each part
    return content.map((part, idx) => {
      if (typeof part === 'string') return <span key={idx}>{part}</span>;
      if (part.type === 'input_image' && part.image_url) {
        return (
          <div className="mt-2" key={idx}>
            <img
              src={part.image_url}
              alt="uploaded"
              className="max-w-full max-h-48 rounded-lg border border-[var(--color-border-subtle)] shadow-subtle"
              style={{ maxWidth: '200px', maxHeight: '150px' }}
            />
          </div>
        );
      }
      // fallback for unknown part
      return <span key={idx}>[Unsupported content]</span>;
    });
  };

  return (
    <div
      className={`my-1 max-w-md px-4 py-3 rounded-xl shadow-medium ${
        isUser
          ? 'rounded-br-lg bg-[var(--color-user-message-bg)] text-[var(--color-user-message-text)] self-end'
          : 'rounded-bl-lg bg-[var(--color-ai-message-bg)] text-[var(--color-ai-message-text)] self-start border border-[var(--color-border-subtle)]'
      }`}
    >
      <div
        className={`text-xs mb-1 ${
          isUser
            ? 'text-[var(--color-user-message-text)]/80'
            : 'text-[var(--color-text-secondary)]'
        }`}
      >
        {formatTimestamp(message.created_at)}
      </div>
      <div>{renderContent(message.content)}</div>
      {renderFileAttachment()}
    </div>
  );
}
