/**
 * Error-handling unit tests (Jest — see audit project in jest.config.js).
 *
 * Verifies, for each error class, that ErrorHandler.handle():
 *   (a) returns the correct HTTP status + user-facing message (the §14 table), and
 *   (b) LOGS the real underlying error before masking it (log-before-mask).
 *
 * Source under test: app/lib/errors/errorHandler.ts
 * Run:  npx jest --selectProjects audit
 *   or: npm test   (runs all Jest projects including audit)
 */
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';

async function handled(err: unknown) {
  const res = ErrorHandler.handle(err, 'TEST_CONTEXT');
  const body = await res.json();
  return { status: res.status, body };
}

describe('ErrorHandler.handle — status + message mapping', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Silence + capture the structured log emitted by ErrorHandler.log().
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => errorSpy.mockRestore());

  test('AppError(401, UNAUTHORIZED) → 401 + session message', async () => {
    const { status, body } = await handled(
      new AppError('Your session has expired. Please log in again.', 401, 'UNAUTHORIZED'),
    );
    expect(status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('UNAUTHORIZED');
    expect(body.message).toMatch(/session has expired/i);
  });

  test('plain Error containing "401" → mapped to 401 + canned message', async () => {
    const { status, body } = await handled(new Error('supabase getUser failed: 401'));
    expect(status).toBe(401);
    expect(body.error.code).toBe('401');
    expect(body.message).toBe('Your session has expired. Please log in again.');
  });

  test('AppError(429, RATE_LIMIT) → 429 + slow-down message', async () => {
    const { status, body } = await handled(
      new AppError('You are sending requests too quickly. Please wait 12s before trying again.', 429, 'RATE_LIMIT'),
    );
    expect(status).toBe(429);
    expect(body.error.code).toBe('RATE_LIMIT');
    expect(body.message).toMatch(/too quickly|wait/i);
  });

  test('plain Error containing "429" → 429 + "AI is busy" message', async () => {
    const { status, body } = await handled(new Error('Gemini 429: High demand'));
    expect(status).toBe(429);
    expect(body.error.code).toBe('429');
    expect(body.message).toBe('The AI is busy right now. Please retry in a few seconds.');
  });

  test('plain Error containing "500" → 500 + temporary-unavailable message', async () => {
    const { status, body } = await handled(new Error('Upstream 500 Internal Server Error'));
    expect(status).toBe(500);
    expect(body.error.code).toBe('500');
    expect(body.message).toBe('Service is temporarily unavailable. Please try again.');
  });

  test('AppError(503) passes through as 503 (no ERROR_MAP key needed)', async () => {
    const { status, body } = await handled(
      new AppError('Feedback system not yet initialized.', 503, 'SERVICE_UNAVAILABLE'),
    );
    expect(status).toBe(503);
    expect(body.error.code).toBe('SERVICE_UNAVAILABLE');
    expect(body.message).toMatch(/not yet initialized/i);
  });

  test('FIXED: a plain Error with "503" now maps to 503 + temporarily-unavailable', async () => {
    // After the precise-matching fix, a standalone 5xx token in the message is
    // classified as that exact status (previously it fell through to a generic 500).
    const { status, body } = await handled(new Error('gateway returned 503'));
    expect(status).toBe(503);
    expect(body.error.code).toBe('503');
    expect(body.message).toBe('Service is temporarily unavailable. Please try again.');
  });

  test('plain Error containing "TIMEOUT" (no digit collision) → 500 + "took too long"', async () => {
    const { status, body } = await handled(new Error('Stream TIMEOUT waiting for first token'));
    expect(status).toBe(500); // ERROR_MAP does not override status for TIMEOUT
    expect(body.error.code).toBe('TIMEOUT');
    expect(body.message).toBe('That took too long. Try a shorter question or document.');
  });

  test('FIXED: a TIMEOUT message containing "25000ms" is correctly classified as TIMEOUT', async () => {
    // The bug is gone. Timeout/abort is checked BEFORE 5xx, and status extraction
    // is word-boundaried (`\b[45]\d{2}\b`), so the "500" inside "25000" never matches.
    const { status, body } = await handled(new Error('Request timed out after 25000ms'));
    expect(status).toBe(500);
    expect(body.error.code).toBe('TIMEOUT'); // correctly classified now (was '500')
    expect(body.message).toBe('That took too long. Try a shorter question or document.');
  });

  test('Error with code "ABORT_ERROR" → mapped to timeout message', async () => {
    // NOTE/quirk: a *native* AbortError (name="AbortError", message="The operation
    // was aborted") would NOT match, because ERROR_MAP keys on the literal string
    // "ABORT_ERROR". Mapping only fires when message/code contains "ABORT_ERROR".
    const e = new Error('stream aborted');
    (e as any).code = 'ABORT_ERROR';
    const { status, body } = await handled(e);
    expect(status).toBe(500);
    expect(body.error.code).toBe('ABORT_ERROR');
    expect(body.message).toBe('That took too long. Try a shorter question or document.');
  });

  test('unmatched Error → generic 500 message', async () => {
    const { status, body } = await handled(new Error('something weird happened'));
    expect(status).toBe(500);
    expect(body.error.code).toBe('INTERNAL_ERROR');
    expect(body.message).toBe('An unexpected error occurred. Please try again.');
  });
});

describe('ErrorHandler.handle — log-before-mask (the #4 worry)', () => {
  let errorSpy: jest.SpyInstance;
  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => errorSpy.mockRestore());

  test('the REAL underlying error is logged even though the client sees a masked message', async () => {
    const raw = 'ENOTFOUND flying-muskox-99999.upstash.io — internal connection detail';
    const { status, body } = await handled(new Error(raw));

    // Client gets the masked generic message…
    expect(status).toBe(500);
    expect(body.message).toBe('An unexpected error occurred. Please try again.');

    // …but the raw error WAS written to the server log first.
    const logged = errorSpy.mock.calls.map((c) => c.map(String).join(' ')).join('\n');
    expect(logged).toContain('ENOTFOUND');
    expect(logged).toContain('flying-muskox-99999');
    expect(logged).toContain('TEST_CONTEXT'); // context is included in the structured log
  });

  test('AppError details are logged with name/message/code', async () => {
    const { body } = await handled(new AppError('DB write failed', 500, 'DB_ERROR', { table: 'notes' }));
    const logged = errorSpy.mock.calls.map((c) => c.map(String).join(' ')).join('\n');
    expect(logged).toContain('DB write failed');
    expect(logged).toContain('DB_ERROR');
    expect(body.error.code).toBe('DB_ERROR');
  });
});
