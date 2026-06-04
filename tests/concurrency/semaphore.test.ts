import { Semaphore, AcquireTimeoutError } from '@/app/lib/ai/semaphore';

const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));

describe('Semaphore (AI concurrency cap)', () => {
  it('never lets more than `max` operations run at once', async () => {
    const LIMIT = 3;
    const N = 12;
    const sem = new Semaphore(LIMIT);

    let active = 0;
    let peak = 0;

    await Promise.all(
      Array.from({ length: N }, () =>
        sem.run(async () => {
          active++;
          peak = Math.max(peak, active);
          await tick(5); // hold the permit briefly
          active--;
        }),
      ),
    );

    expect(peak).toBeLessThanOrEqual(LIMIT);
    expect(peak).toBe(LIMIT); // and it actually reaches the cap
    expect(sem.available).toBe(LIMIT); // all permits returned
    expect(sem.queued).toBe(0);
  });

  it('sheds overflow as AcquireTimeoutError once the wait budget is spent', async () => {
    const sem = new Semaphore(1);
    await sem.acquire(); // hold the only permit, never release during the test

    await expect(sem.acquire(50)).rejects.toBeInstanceOf(AcquireTimeoutError);
    expect(sem.queued).toBe(0); // the timed-out waiter is removed from the queue
  });

  it('hands a released permit to the next waiter (no spurious timeout)', async () => {
    const sem = new Semaphore(1);
    await sem.acquire();

    let acquired = false;
    const waiting = sem.acquire(1000).then(() => { acquired = true; });

    await tick(10);
    expect(acquired).toBe(false); // still queued

    sem.release(); // hand the permit over
    await waiting;
    expect(acquired).toBe(true);
  });

  it('release() always runs even if the wrapped fn throws', async () => {
    const sem = new Semaphore(1);
    await expect(sem.run(async () => { throw new Error('boom'); })).rejects.toThrow('boom');
    expect(sem.available).toBe(1); // permit was returned despite the throw
  });
});
