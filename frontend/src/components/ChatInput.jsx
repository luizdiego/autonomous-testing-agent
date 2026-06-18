import { useState } from 'react';
import { Plus, Mic, ChevronDown, Zap } from 'lucide-react';
import './ChatInput.css';

const MODELS = ['Flash', 'Pro', 'Ultra'];

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');
  const [model, setModel] = useState('Flash');
  const [showModels, setShowModels] = useState(false);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-bar">
        <button className="input-btn add-btn" title="Add attachment">
          <Plus size={18} />
        </button>

        <textarea
          className="chat-textarea"
          placeholder="Describe your test scenario..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />

        <div className="input-actions">
          <div className="model-selector" onClick={() => setShowModels(!showModels)}>
            <Zap size={10} className="model-dot" />
            <span>{model}</span>
            <ChevronDown size={14} />
            {showModels && (
              <div className="model-dropdown">
                {MODELS.map(m => (
                  <button
                    key={m}
                    className={`model-option ${m === model ? 'selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setModel(m); setShowModels(false); }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="input-btn mic-btn" title="Voice input">
            <Mic size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
