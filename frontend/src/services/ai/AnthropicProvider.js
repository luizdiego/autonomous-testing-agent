import { BaseProvider } from './BaseProvider';

export class AnthropicProvider extends BaseProvider {
  get id() { return 'anthropic'; }
  get label() { return 'Anthropic'; }
  get models() { return ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest']; }
  get baseUrl() { return this.config.baseUrl || 'https://api.anthropic.com/v1'; }
  isReady() { return Boolean(this.config.token); }

  async chat({ messages, model = 'claude-3-5-haiku-latest', signal }) {
    if (!this.isReady()) throw new Error('Anthropic API key is missing. Open Settings (⚙) to add one.');
    const system = messages.filter(m => m.role === 'system').map(m => m.content).join('\n\n');
    const convo  = messages.filter(m => m.role !== 'system');
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST', signal,
      headers: { 'x-api-key': this.config.token, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, system, messages: convo, max_tokens: 2048 }),
    });
    if (!res.ok) { const t = await res.text().catch(() => ''); throw new Error(`Anthropic error (${res.status}): ${t}`); }
    const data = await res.json();
    return { content: data?.content?.map(c => c.text).join('') ?? '', raw: data };
  }
}
