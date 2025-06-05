import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onDelete: () => void;
  disableDelete?: boolean;
}

export default function ChatManagementMenu({ onDelete, disableDelete = false }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="p-1 rounded hover:bg-gray-200"
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-md z-10">
          <button
            className="flex items-center w-full px-2 py-1 text-left text-sm hover:bg-gray-100 disabled:opacity-50"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            disabled={disableDelete}
          >
            <svg
              className="mr-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18" />
              <path d="M8 6v12" />
              <path d="M16 6v12" />
              <path d="M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6" />
            </svg>
            Delete
          </button>
          <button
            className="flex items-center w-full px-2 py-1 text-left text-sm text-gray-400 cursor-default"
          >
            <svg
              className="mr-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 20h4l10-10-4-4-10 10v4z" />
            </svg>
            Rename
          </button>
        </div>
      )}
    </div>
  );
}
