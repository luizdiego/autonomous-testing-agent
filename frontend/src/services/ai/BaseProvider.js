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
   * @param {{ messages: Array<{role:string,content:string}>, model?: string, signal?: AbortSignal }} params
   * @returns {Promise<{ content: string, raw?: any }>}
   */
  // eslint-disable-next-line no-unused-vars
  async chat({ messages, model, signal }) {
    throw new Error('Provider must implement chat()');
  }
}
