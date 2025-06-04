import React, { useRef, useState } from 'react';

interface Props {
  onSend: (content: string) => Promise<void> | void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
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
    <div className="flex items-end gap-2 mt-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        rows={1}
        className="flex-1 resize-none border rounded p-2"
        placeholder="Type a message"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-3 py-2 bg-highlight text-white rounded disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
