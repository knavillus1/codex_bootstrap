import React, { useRef } from 'react';

interface Props {
  onUpload: (file: File) => Promise<void> | void;
}

export default function FileUpload({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    e.target.value = '';
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleClick}
        className="p-2 text-highlight hover:text-primary"
      >
        📎
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
