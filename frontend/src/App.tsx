import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useChat from './hooks/useChat';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function Home() {
  const {
    chats,
    activeChatId,
    activeChat,
    selectChat,
    createChat,
    deleteChat,
  } = useChat();

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelect={selectChat}
        onNewChat={() => void createChat()}
        onDeleteChat={deleteChat}
      />
      <ChatArea activeChat={activeChat} />
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
