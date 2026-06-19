import { useState } from 'react';
import { Plus, Mic, ChevronDown, Zap } from 'lucide-react';
import { aiService } from '../services/ai';
import './ChatInput.css';

export default function ChatInput({ onSend }) {
  const [value, setValue]         = useState('');
  const [showModels, setShowModels] = useState(false);

  const settings     = aiService.getSettings();
  const providerMeta = aiService.getActiveProviderMeta();
  const currentModel = settings.providers[settings.activeProvider]?.model || providerMeta.models[0];

  const setModel = (m) => {
    const s = aiService.getSettings();
    aiService.updateSettings({
      ...s,
      providers: { ...s.providers, [s.activeProvider]: { ...s.providers[s.activeProvider], model: m } },
    });
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-bar">
        <button className="input-btn add-btn" title="Add attachment"><Plus size={18} /></button>

        <textarea
          className="chat-textarea"
          placeholder="Describe your test scenario..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />

        <div className="input-actions">
          <div className="model-selector" onClick={() => setShowModels(!showModels)}>
            <Zap size={10} className="model-dot" />
            <span>{currentModel}</span>
            <ChevronDown size={14} />
            {showModels && (
              <div className="model-dropdown">
                {providerMeta.models.map(m => (
                  <button
                    key={m}
                    className={`model-option ${m === currentModel ? 'selected' : ''}`}
                    onClick={e => { e.stopPropagation(); setModel(m); setShowModels(false); }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="input-btn mic-btn" title="Voice input"><Mic size={18} /></button>
        </div>
      </div>
    </div>
  );
}
