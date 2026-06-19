/**
 * Base contract every AI provider must implement.
 */
export class BaseProvider {
  constructor(config = {}) {
    this.config = config;
  }

  get id() { throw new Error('Provider must define an id'); }
  get label() { throw new Error('Provider must define a label'); }
  get models() { return []; }
  isReady() { return false; }

  /**
   * Verify the configured credentials by making a minimal request.
   * @param {{ signal?: AbortSignal }} [params]
   * @returns {Promise<{ ok: boolean, message: string }>}
   */
  async verify({ signal } = {}) {
    if (!this.isReady()) {
      return { ok: false, message: 'No token provided.' };
    }
    try {
      await this.chat({
        messages: [{ role: 'user', content: 'ping' }],
        model: this.models[0],
        signal,
      });
      return { ok: true, message: 'Credentials are valid.' };
    } catch (err) {
      return { ok: false, message: err?.message || 'Verification failed.' };
    }
  }

  /**
   * @param {{ messages: Array<{role:string,content:string}>, model?: string, signal?: AbortSignal }} params
   * @returns {Promise<{ content: string, raw?: any }>}
   */
  // eslint-disable-next-line no-unused-vars
  async chat({ messages, model, signal }) {
    throw new Error('Provider must implement chat()');
  }
}
