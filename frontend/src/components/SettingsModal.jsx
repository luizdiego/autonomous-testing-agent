import { useState } from 'react';
import { X, Eye, EyeOff, Check, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { PROVIDER_META, aiService } from '../services/ai';
import './SettingsModal.css';

export default function SettingsModal({ onClose }) {
  const [settings, setSettings] = useState(() => structuredClone(aiService.getSettings()));
  const [showToken, setShowToken] = useState({});
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const active = settings.activeProvider;
  const providerCfg = settings.providers[active] || {};
  const providerMeta = PROVIDER_META.find(p => p.id === active);

  const set = (field, value) => {
    if (field === 'token') setTestResult(null);
    setSettings(prev => ({
      ...prev,
      providers: { ...prev.providers, [active]: { ...prev.providers[active], [field]: value } },
    }));
  };

  const handleSave = () => {
    aiService.updateSettings(settings);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await aiService.testCredentials(active, providerCfg);
    setTestResult(result);
    setTesting(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          {/* Provider selector */}
          <label className="field-label">AI Provider</label>
          <div className="provider-tabs">
            {PROVIDER_META.map(p => (
              <button
                key={p.id}
                className={`provider-tab ${p.id === active ? 'active' : ''}`}
                onClick={() => { setTestResult(null); setSettings(prev => ({ ...prev, activeProvider: p.id })); }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Token */}
          <label className="field-label" style={{ marginTop: 20 }}>
            API Token / Key
          </label>
          <div className="token-row">
            <input
              className="field-input"
              type={showToken[active] ? 'text' : 'password'}
              placeholder={`Paste your ${providerMeta?.label} token here`}
              value={providerCfg.token || ''}
              onChange={e => set('token', e.target.value)}
            />
            <button
              className="toggle-visibility"
              onClick={() => setShowToken(prev => ({ ...prev, [active]: !prev[active] }))}
              title={showToken[active] ? 'Hide' : 'Show'}
            >
              {showToken[active] ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="field-hint">Stored in browser localStorage only — never sent to our servers.</p>

          <div className="test-credentials-row">
            <button
              className="btn-test"
              onClick={handleTest}
              disabled={testing || !providerCfg.token}
              title="Send a minimal request to verify your credentials"
            >
              {testing
                ? <><Loader2 size={14} className="spin" /> Testing…</>
                : 'Test credentials'}
            </button>
            {testResult && (
              <span className={`test-result ${testResult.ok ? 'ok' : 'fail'}`}>
                {testResult.ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                <span>{testResult.message}</span>
              </span>
            )}
          </div>

          {/* Model */}
          <label className="field-label" style={{ marginTop: 20 }}>Model</label>
          <select
            className="field-select"
            value={providerCfg.model || ''}
            onChange={e => set('model', e.target.value)}
          >
            {(providerMeta?.models || []).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
            {saved ? <><Check size={14} /> Saved</> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
