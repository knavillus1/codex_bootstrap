import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useChat from './hooks/useChat';
import useMessages from './hooks/useMessages';

function Home() {
  const { chats, activeChatId, activeChat, selectChat } = useChat();
  const { messages, loadMessages } = useMessages();

  useEffect(() => {
    if (activeChatId) {
      void loadMessages(activeChatId);
    }
  }, [activeChatId]);

  return (
    <div className="flex">
      <aside className="w-1/4 border-r p-4">
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => selectChat(chat.id)}
            className={`block w-full text-left mb-2 ${chat.id === activeChatId ? 'font-bold' : ''}`}
          >
            {chat.title}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{activeChat ? activeChat.title : 'AI Chat Application'}</h1>
        <ul>
          {messages.map(m => (
            <li key={m.id}>{m.content}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
