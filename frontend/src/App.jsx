import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContextPanel from './components/ContextPanel';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import './App.css';

let msgId = 0;

export default function App() {
  const [activeView, setActiveView] = useState('chats');
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const userMsg = { id: ++msgId, role: 'user', content: text };
    const agentMsg = {
      id: ++msgId,
      role: 'assistant',
      status: 'pending',
      content: 'Running test scenario... (connect your agent backend to process this prompt with the provided context)',
    };
    setMessages(prev => [...prev, userMsg, agentMsg]);
  };

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <main className="main-area">
        <ChatArea messages={messages} />
        <div className="input-row">
          <ChatInput onSend={handleSend} />
        </div>
      </main>

      <ContextPanel />
    </div>
  );
}

