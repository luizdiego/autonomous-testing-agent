import { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ContextPanel from './components/ContextPanel';
import ChatArea from './components/ChatArea';
import PanelView from './components/PanelView';
import ChatInput from './components/ChatInput';
import SettingsModal from './components/SettingsModal';
import { aiService } from './services/ai';
import './App.css';

let msgId = 0;

export default function App() {
  const [activeView, setActiveView]     = useState('chats');
  const [messages, setMessages]         = useState([]);
  const [contexts, setContexts]         = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const abortRef = useRef(null);

  const handleSend = async (text) => {
    const userMsg = { id: ++msgId, role: 'user', content: text };
    const pendingId = ++msgId;
    const pendingMsg = { id: pendingId, role: 'assistant', status: 'pending', content: 'Thinking...' };
    setMessages(prev => [...prev, userMsg, pendingMsg]);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const { content } = await aiService.sendPrompt({
        contexts,
        history: messages,
        prompt: text,
        signal: controller.signal,
      });
      setMessages(prev => prev.map(m =>
        m.id === pendingId ? { ...m, status: 'pass', content } : m
      ));
    } catch (err) {
      if (err.name === 'AbortError') return;
      setMessages(prev => prev.map(m =>
        m.id === pendingId ? { ...m, status: 'fail', content: err.message } : m
      ));
    }
  };

  const handleNavigate = (id) => {
    if (id === 'settings') { setShowSettings(true); return; }
    if (id === 'new') {
      abortRef.current?.abort();
      setMessages([]);
      setActiveView('chats');
      return;
    }
    setActiveView(id);
  };

  const isChatView = activeView === 'chats';

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      <main className="main-area">
        {isChatView ? (
          <>
            <ChatArea messages={messages} />
            <div className="input-row">
              <ChatInput onSend={handleSend} />
            </div>
          </>
        ) : (
          <PanelView
            view={activeView}
            messages={messages}
            onOpenChat={() => setActiveView('chats')}
          />
        )}
      </main>

      <ContextPanel onContextsChange={setContexts} />

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

