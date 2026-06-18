import { BaseProvider } from './BaseProvider';

export class OpenAIProvider extends BaseProvider {
  get id() { return 'openai'; }
  get label() { return 'OpenAI'; }
  get models() { return ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']; }
  get baseUrl() { return this.config.baseUrl || 'https://api.openai.com/v1'; }
  isReady() { return Boolean(this.config.token); }

  async chat({ messages, model = 'gpt-4o-mini', signal }) {
    if (!this.isReady()) throw new Error('OpenAI API key is missing. Open Settings (⚙) to add one.');
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST', signal,
      headers: { 'Authorization': `Bearer ${this.config.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false }),
    });
    if (!res.ok) { const t = await res.text().catch(() => ''); throw new Error(`OpenAI error (${res.status}): ${t}`); }
    const data = await res.json();
    return { content: data?.choices?.[0]?.message?.content ?? '', raw: data };
  }
}
