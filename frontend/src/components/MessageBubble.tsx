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
            className="max-w-full max-h-48 rounded border"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
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
  
  return (
    <div
      className={`my-1 max-w-xs px-3 py-2 rounded ${
        isUser ? 'bg-secondary self-end' : 'bg-accent self-start'
      }`}
    >
      <div className="text-xs text-gray-500 mb-1">
        {formatTimestamp(message.created_at)}
      </div>
      <div>{message.content}</div>
      {renderFileAttachment()}
    </div>
  );
}
