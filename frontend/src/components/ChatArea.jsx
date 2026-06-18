import { Bot, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import './ChatArea.css';

const STATUS_ICONS = {
  pass: <CheckCircle size={14} className="status-pass" />,
  fail: <XCircle size={14} className="status-fail" />,
  pending: <Clock size={14} className="status-pending" />,
};

export default function ChatArea({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="chat-empty">
        <div className="glow-bg" />
        <h1 className="welcome-title">Hi there, what do you want to test?</h1>
        <p className="welcome-sub">Describe a test scenario or paste a prompt below. Your context will be applied automatically.</p>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message-${msg.role}`}>
          <div className="message-avatar">
            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
          </div>
          <div className="message-content">
            {msg.status && (
              <div className="test-status-badge">
                {STATUS_ICONS[msg.status]}
                <span>{msg.status.toUpperCase()}</span>
              </div>
            )}
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
