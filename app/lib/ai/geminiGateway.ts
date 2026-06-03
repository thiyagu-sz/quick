import { CONFIG } from '../config';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  systemPrompt?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

export class GeminiGateway {
  private static get apiKey() {
    return process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  }

  static validateConfig(): void {
    if (!this.apiKey) throw new Error('GOOGLE_GENERATIVE_AI_API_KEY not set');
  }

  private static toGeminiMessages(messages: Array<{ role: string; content: string }>): GeminiMessage[] {
    return messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
  }

  private static buildBody(req: GeminiRequest) {
    const systemMsg = req.messages.find(m => m.role === 'system');
    return {
      contents: this.toGeminiMessages(req.messages),
      ...(systemMsg && {
        systemInstruction: { parts: [{ text: systemMsg.content }] },
      }),
      generationConfig: {
        maxOutputTokens: req.max_tokens ?? CONFIG.AI.MAX_TOKENS,
        temperature: req.temperature ?? CONFIG.AI.TEMPERATURE,
      },
    };
  }

  // Returns a ReadableStream of raw SSE bytes from Gemini
  static async streamRequest(req: GeminiRequest): Promise<ReadableStream<Uint8Array>> {
    this.validateConfig();
    const model = req.model.replace(/^google\//, ''); // strip provider prefix if present
    const url = `${BASE_URL}/models/${model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.buildBody(req)),
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      const msg = response.status === 429
        ? 'Gemini 429: High demand — please retry in a few seconds'
        : `Gemini ${response.status}: ${response.statusText}`;
      console.error('[GeminiGateway] Error', { status: response.status, body: body.slice(0, 300) });
      throw new Error(msg);
    }

    if (!response.body) throw new Error('No response body from Gemini');
    return response.body;
  }

  // Non-streaming completion
  static async complete(req: GeminiRequest): Promise<string> {
    this.validateConfig();
    const model = req.model.replace(/^google\//, '');
    const url = `${BASE_URL}/models/${model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.buildBody(req)),
      signal: AbortSignal.timeout(35_000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('[GeminiGateway] Completion error', { status: response.status, body: body.slice(0, 300) });
      throw new Error(`Gemini ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini');
    return text;
  }
}
