import { GitHubCopilotProvider } from './GitHubCopilotProvider';
import { OpenAIProvider }         from './OpenAIProvider';
import { AnthropicProvider }      from './AnthropicProvider';
import { loadSettings, saveSettings } from '../storage';

const REGISTRY = {
  'github-copilot': GitHubCopilotProvider,
  'openai':         OpenAIProvider,
  'anthropic':      AnthropicProvider,
};

export const PROVIDER_META = Object.entries(REGISTRY).map(([id, Cls]) => {
  const inst = new Cls({});
  return { id, label: inst.label, models: inst.models };
});

const DEFAULTS = {
  activeProvider: 'github-copilot',
  providers: {
    'github-copilot': { token: '', model: 'gpt-4o-mini' },
    'openai':         { token: '', model: 'gpt-4o-mini' },
    'anthropic':      { token: '', model: 'claude-3-5-haiku-latest' },
  },
};

function merge(stored) {
  return {
    activeProvider: stored.activeProvider || DEFAULTS.activeProvider,
    providers: { ...DEFAULTS.providers, ...(stored.providers || {}) },
  };
}

class AIService {
  constructor() { this.settings = merge(loadSettings()); }

  getSettings() { return this.settings; }

  updateSettings(next) {
    this.settings = merge(next);
    saveSettings(this.settings);
  }

  getActiveProviderMeta() {
    return PROVIDER_META.find(p => p.id === this.settings.activeProvider) || PROVIDER_META[0];
  }

  _makeProvider() {
    const id  = this.settings.activeProvider;
    const Cls = REGISTRY[id];
    if (!Cls) throw new Error(`Unknown provider: ${id}`);
    return new Cls(this.settings.providers[id] || {});
  }

  buildMessages({ contexts = [], history = [], prompt }) {
    const msgs = [];
    const sys = contexts
      .filter(c => c.content?.trim())
      .map(c => `## ${c.name}\n${c.content.trim()}`)
      .join('\n\n');
    if (sys) msgs.push({ role: 'system', content: sys });
    for (const m of history) {
      if (m.role === 'user' || m.role === 'assistant') msgs.push({ role: m.role, content: m.content });
    }
    msgs.push({ role: 'user', content: prompt });
    return msgs;
  }

  async sendPrompt({ contexts, history, prompt, signal }) {
    const provider = this._makeProvider();
    const messages = this.buildMessages({ contexts, history, prompt });
    const cfg      = this.settings.providers[provider.id] || {};
    return provider.chat({ messages, model: cfg.model, signal });
  }

  /**
   * Verify credentials for a provider without persisting them.
   * @param {string} providerId
   * @param {{ token?: string, model?: string }} [config]
   * @param {{ signal?: AbortSignal }} [opts]
   * @returns {Promise<{ ok: boolean, message: string }>}
   */
  async testCredentials(providerId, config, { signal } = {}) {
    const Cls = REGISTRY[providerId];
    if (!Cls) return { ok: false, message: `Unknown provider: ${providerId}` };
    const cfg = config || this.settings.providers[providerId] || {};
    const provider = new Cls(cfg);
    return provider.verify({ signal });
  }
}

export const aiService = new AIService();
