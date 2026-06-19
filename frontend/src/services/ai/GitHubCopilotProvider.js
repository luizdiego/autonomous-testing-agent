import { BaseProvider } from './BaseProvider';

/**
 * GitHub Copilot Chat provider.
 *
 * The Copilot API is OpenAI-compatible (api.githubcopilot.com).
 * In development we proxy it through Vite at /api/copilot to avoid CORS.
 */
export class GitHubCopilotProvider extends BaseProvider {
  get id() { return 'github-copilot'; }
  get label() { return 'GitHub Copilot'; }
  get models() {
    return ['gpt-4o', 'gpt-4o-mini', 'claude-3.5-sonnet', 'o1-mini', 'o3-mini'];
  }
  get baseUrl() { return '/api/copilot'; }

  isReady() { return Boolean(this.config.token); }

  async chat({ messages, model = 'gpt-4o-mini', signal }) {
    if (!this.isReady()) {
      throw new Error('GitHub Copilot token is missing. Open Settings (⚙) to add one.');
    }

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      signal,
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
        'Content-Type': 'application/json',
        'Editor-Version': 'vscode/1.95.0',
        'Editor-Plugin-Version': 'copilot-chat/0.20.0',
        'Copilot-Integration-Id': 'vscode-chat',
        'OpenAI-Intent': 'conversation-panel',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature: 0.2,
        n: 1,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Copilot error (${res.status}): ${text || res.statusText}`);
    }

    const data = await res.json();
    return { content: data?.choices?.[0]?.message?.content ?? '', raw: data };
  }
}
