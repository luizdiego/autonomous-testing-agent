import { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import './ContextPanel.css';

const DEFAULT_CONTEXTS = [
  { id: 1, name: 'System Prompt', content: 'You are an autonomous testing agent. You help generate, run and evaluate test cases for software applications.' },
  { id: 2, name: 'App Under Test', content: '' },
];

export default function ContextPanel({ onContextsChange }) {
  const [contexts, setContexts] = useState(DEFAULT_CONTEXTS);
  const [expanded, setExpanded] = useState({ 1: true, 2: false });
  const [nextId, setNextId]     = useState(3);

  useEffect(() => {
    onContextsChange?.(contexts);
  }, [contexts, onContextsChange]);

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const addContext = () => {
    const id = nextId;
    setNextId(id + 1);
    setContexts(prev => [...prev, { id, name: `Context ${id}`, content: '' }]);
    setExpanded(prev => ({ ...prev, [id]: true }));
  };

  const remove = (id) => setContexts(prev => prev.filter(c => c.id !== id));

  const update = (id, field, value) =>
    setContexts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));

  return (
    <div className="context-panel">
      <div className="context-panel-header">
        <FileText size={15} />
        <span>Context</span>
        <button className="ctx-add-btn" onClick={addContext} title="Add context block">
          <Plus size={14} />
        </button>
      </div>

      <div className="context-list">
        {contexts.map(ctx => (
          <div key={ctx.id} className="context-block">
            <div className="context-block-header" onClick={() => toggle(ctx.id)}>
              <input
                className="ctx-name-input"
                value={ctx.name}
                onChange={e => update(ctx.id, 'name', e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              <div className="ctx-block-actions">
                <button className="ctx-icon-btn" onClick={e => { e.stopPropagation(); remove(ctx.id); }} title="Remove">
                  <Trash2 size={13} />
                </button>
                {expanded[ctx.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </div>
            {expanded[ctx.id] && (
              <textarea
                className="ctx-content"
                value={ctx.content}
                onChange={e => update(ctx.id, 'content', e.target.value)}
                placeholder="Enter context information..."
                rows={4}
              />
            )}
          </div>
        ))}
      </div>

      <div className="context-panel-footer">
        <span className="ctx-hint">Context is injected before each prompt</span>
      </div>
    </div>
  );
}
