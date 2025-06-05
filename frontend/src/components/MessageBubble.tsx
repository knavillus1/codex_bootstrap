import React from 'react';
import type { Message } from '../types/message';
import { formatTimestamp } from '../utils/dateUtils';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  
  // Only show the file thumbnail if it is not already rendered in content
  // For user messages, only show the file image if it is not already rendered by renderFileAttachment or renderContent
  // Remove renderFileAttachment for image files, rely on renderContent and shouldShowFileImage logic
  const renderFileAttachment = () => {
    if (!message.file) return null;
    const { filename, content_type, url } = message.file;
    const isImage = content_type.startsWith('image/');
    if (isImage && url) {
      // Do not render here, handled by renderContent or shouldShowFileImage
      return null;
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
  
  // --- Show image thumbnail for outgoing user message if file is image ---
  const showUserImage = message.role === 'user' && message.file && message.file.content_type.startsWith('image/') && message.file.url;

  // Helper to get full URL for file access
  const getFileUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url; // Already absolute URL
    }
    // Convert relative URL to absolute URL for frontend display
    const backendBaseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';
    return `${backendBaseUrl}${url}`;
  };

  // Helper to render OpenAI-style content (string or array of parts)
  const renderContent = (content: Message["content"]) => {
    if (typeof content === 'string') return <span>{content}</span>;
    // If content is an array, render each part
    return content.map((part, idx) => {
      if (typeof part === 'string') return <span key={idx}>{part}</span>;
      if (part.type === 'input_image' && 'image_url' in part) {
        return (
          <div className="mt-2" key={idx}>
            <img
              src={getFileUrl(part.image_url)}
              alt="uploaded"
              className="max-w-full max-h-48 rounded-lg border border-[var(--color-border-subtle)] shadow-subtle"
              style={{ maxWidth: '200px', maxHeight: '150px' }}
            />
          </div>
        );
      }
      if (part.type === 'input_text' && 'text' in part) {
        return <span key={idx}>{String(part.text)}</span>;
      }
      // fallback for unknown part
      return <span key={idx}>[Unsupported content]</span>;
    });
  };

  // Only show the file thumbnail if it is not already rendered in content
  // For user messages, only show the file image if it is not already rendered by renderFileAttachment or renderContent
  const shouldShowFileImage = showUserImage && (
    (typeof message.content === 'string' && !message.content.includes(message.file?.filename || '')) ||
    (Array.isArray(message.content) && !message.content.some(
      part => typeof part === 'object' && part.type === 'input_image')
    )
  );

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
      {shouldShowFileImage && message.file && (
        <div className="mt-2">
          <img
            src={getFileUrl(message.file.url || (message.file as any).data_uri)}
            alt={message.file.filename}
            className="max-w-full max-h-48 rounded-lg border border-[var(--color-border-subtle)] shadow-subtle"
            style={{ maxWidth: '200px', maxHeight: '150px' }}
            onError={e => {
              const file = message.file as any;
              if (file.data_uri && (e.target as HTMLImageElement).src !== file.data_uri) {
                (e.target as HTMLImageElement).src = file.data_uri;
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
