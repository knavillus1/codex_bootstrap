import React, { useRef, useState } from 'react';
import FileUpload from './FileUpload';

interface Props {
  onSend: (content: string) => Promise<void> | void;
  onUpload?: (file: File) => Promise<void> | void;
  loading: boolean;
}

export default function ChatInput({ onSend, onUpload, loading }: Props) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    await onSend(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="flex items-end gap-2 mt-4 p-2 bg-white rounded-xl shadow-medium border border-[var(--color-border-subtle)]">
      {onUpload && <FileUpload onUpload={onUpload} />}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        rows={1}
        className="flex-1 resize-none border-0 focus:ring-0 bg-transparent p-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
        placeholder="Type a message..."
        style={{ minHeight: '2.5rem', maxHeight: '10rem' }}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-2 bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-button-primary-bg)]/90 transition-colors font-medium shadow-subtle"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
