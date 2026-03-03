# QuickNotes Verification Plan

This document outlines the verification strategy for the production architecture stabilization of QuickNotes.

## 1. Manual Test Checklist

### Authentication & Isolation
- [ ] **Login/Logout**: Verify that logging out clears all user data from the UI.
- [ ] **Account Switching**: Log in as User A, view chat, logout, log in as User B. Verify User A's chat is NOT visible.
- [ ] **Auth Enforcement**: Try to access `/api/chat/history` via a direct browser request without a session. Should return 401.

### AI Service & Concurrency
- [ ] **Basic Chat**: Verify streaming response works.
- [ ] **RAG Flow**: Upload a document and ask a question about it. Verify "sources" are returned in the chat.
- [ ] **Concurrency**: Open 10 browser tabs and send chat messages simultaneously. All should eventually complete via the semaphore.
- [ ] **Timeout**: Temporarily set `AI_TIMEOUT=100` in `.env`. Verify the UI shows the "optimizing our AI engine" message.
- [ ] **Retry**: Simulate a 500 error from OpenRouter. Verify logs show retry attempts before failing.

### Feedback System
- [ ] **Submission**: Submit a feedback form. Verify success message.
- [ ] **Validation**: Try to submit without a message or email. Verify error messages.
- [ ] **Dashboard**: Verify submitted feedback appears in the admin dashboard (if implemented).

---

## 2. Unit Test Examples (Vitest)

Create `app/lib/ai/__tests__/aiService.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiService } from '../aiService';

vi.mock('../config', () => ({
  CONFIG: {
    AI: {
      DEFAULT_MODEL: 'test-model',
      MAX_TOKENS: 100,
      TEMPERATURE: 0.7,
      TIMEOUT: 1000,
      CONCURRENCY_LIMIT: 2,
      RETRY_ATTEMPTS: 1,
    }
  }
}));

describe('AiService', () => {
  it('should handle concurrency limits', async () => {
    // Test semaphore logic
  });

  it('should retry on failure', async () => {
    // Mock fetch to fail once then succeed
  });
});
```

---

## 3. Playwright E2E Test Script

Create `tests/e2e/chat-isolation.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('should isolate chat history between users', async ({ browser }) => {
  // 1. Setup User A context
  const contextA = await browser.newContext();
  const pageA = await contextA.newPage();
  // ... Login and send message "Hello from A" ...

  // 2. Setup User B context
  const contextB = await browser.newContext();
  const pageB = await contextB.newPage();
  // ... Login and send message "Hello from B" ...

  // 3. Verify Isolation
  await pageB.reload();
  await expect(pageB.locator('text=Hello from A')).not.toBeVisible();
});
```

---

## 4. k6 Load Test Script (50 Concurrent Users)

Create `tests/load/chat-load.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:3000/api/chat';
  const payload = JSON.stringify({
    question: 'How does QuickNotes work?',
    conversationId: 'test-conv-id',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TEST_JWT_HERE',
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'rate limit not hit': (r) => r.status !== 429,
  });
  sleep(1);
}
```
