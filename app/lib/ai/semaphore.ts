/**
 * Minimal async counting semaphore — no dependencies.
 *
 * Bounds how many operations run at once *per process / Lambda instance*. The AI
 * gateways shipped a configured CONCURRENCY_LIMIT that was never enforced, so two
 * concurrent users fanned out to unbounded OpenRouter streams → upstream 429s →
 * the shared circuit breaker tripped → cascading 500s for everyone. This caps the
 * fan-out and sheds genuine overflow as a clean, retryable AcquireTimeoutError
 * (mapped to a 429 "busy, retry") instead of letting it become a 500.
 */
export class AcquireTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Semaphore acquire timed out after ${timeoutMs}ms`);
    this.name = 'AcquireTimeoutError';
  }
}

interface Waiter {
  resolve: () => void;
  reject: (err: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
}

export class Semaphore {
  private permits: number;
  private readonly max: number;
  private readonly waiters: Waiter[] = [];

  constructor(max: number) {
    this.max = Math.max(1, Math.floor(max));
    this.permits = this.max;
  }

  /**
   * Acquire one permit. If none are free, wait up to `timeoutMs` for one to be
   * released. A `timeoutMs` of 0 waits indefinitely. Rejects with
   * AcquireTimeoutError if the wait budget is exceeded.
   */
  acquire(timeoutMs = 0): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const waiter: Waiter = { resolve, reject, timer: null };
      if (timeoutMs > 0) {
        waiter.timer = setTimeout(() => {
          const idx = this.waiters.indexOf(waiter);
          if (idx !== -1) this.waiters.splice(idx, 1);
          reject(new AcquireTimeoutError(timeoutMs));
        }, timeoutMs);
      }
      this.waiters.push(waiter);
    });
  }

  /** Release one permit, handing it directly to the next waiter if any. */
  release(): void {
    const next = this.waiters.shift();
    if (next) {
      if (next.timer) clearTimeout(next.timer);
      next.resolve(); // transfer the permit; permits count stays the same
      return;
    }
    if (this.permits < this.max) this.permits++;
  }

  /** Run `fn` while holding a permit; always releases, even on throw. */
  async run<T>(fn: () => Promise<T>, timeoutMs = 0): Promise<T> {
    await this.acquire(timeoutMs);
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  /** Permits currently free (for tests / observability). */
  get available(): number {
    return this.permits;
  }

  /** Callers currently waiting for a permit (for tests / observability). */
  get queued(): number {
    return this.waiters.length;
  }
}
