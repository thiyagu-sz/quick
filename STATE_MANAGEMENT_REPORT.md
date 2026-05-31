# STATE MANAGEMENT REPORT
> Generated: 2026-05-30

---

## 1. RACE CONDITIONS

### RC-01: Sidebar Double-Fetch on Mount

**Location:** `app/components/Sidebar.tsx:164–199`

Both `fetchUser()` and `onAuthStateChange('INITIAL_SESSION')` fire on component mount. They both call `loadChatHistory(userId)` within milliseconds of each other.

```
mount → fetchUser() starts (async)
      → onAuthStateChange subscription registers
          → INITIAL_SESSION fires immediately (Supabase fires it synchronously on .subscribe())
          → loadChatHistory(A) called        ← Call A
      → fetchUser() resolves
          → loadChatHistory(B) called        ← Call B (50-200ms later)
```

Both calls are in-flight simultaneously. If A resolves after B, A's result overwrites B's fresher result. This is a race condition that can show stale data.

**Fix:** Remove the `onAuthStateChange` reload on `INITIAL_SESSION` OR remove `fetchUser()`, not both.

---

### RC-02: Sidebar Re-fetches on Every Pathname Change

**Location:** `app/components/Sidebar.tsx:199`

```ts
}, [pathname]);
```

The `useEffect` that sets up the auth subscription AND calls `fetchUser()` depends on `pathname`. Every page navigation destroys and re-creates the Supabase auth subscription, then fires another `fetchUser()`. This means:

- Navigate from `/chat` to `/dashboard` → 2 history fetches
- Navigate back → 2 more history fetches
- 10 navigations = ~20 history fetches

**Fix:** Remove `pathname` from the dependency array. The auth subscription should be set up once on mount, not re-created on navigation.

---

### RC-03: Chat Draft Save Race Condition

**Location:** `app/chat/page.tsx:459–482`

A 300ms debounce saves the draft to localStorage. The `useEffect` has this extensive dependency array:
```ts
[messages, currentConversationId, saveChat, selectedFormat, wordCount, user?.id, saveDraftToLocalStorage]
```

`saveDraftToLocalStorage` is itself a `useCallback` with the same deps. So when `messages` changes (every token during streaming), the debounce resets 300ms, causing rapid successive saves. During a streaming response, this can trigger hundreds of localStorage writes per second.

**Fix:** Debounce off `messages.length` change only, or save draft only when streaming completes.

---

## 2. STALE STATE

### SS-01: USER_UPDATED Clears History (Fixed)

**Status:** Fixed in last session  
`USER_UPDATED` (token refresh) was clearing `chatHistory` without reloading.

---

### SS-02: `handleSendRef` Pattern

**Location:** `app/chat/page.tsx:1178`

```ts
handleSendRef.current = handleSend; // always point to latest closure
```

This is a valid pattern for breaking circular effect dependencies. Not a bug, but worth noting it captures all state at call time — if the rate-limit retry fires after a state reset, it may use stale user/message state.

---

### SS-03: Conversation ID Inconsistency Between Two Save Paths

The chat page has **two save paths** that can run simultaneously:

**Path A:** `handleSend()` calls `saveMessageToDatabase()` before the AI call  
**Path B:** `app/api/chat/route.ts` `flush()` saves the assistant message after streaming

Both paths write to `chat_conversations` and `chat_messages`. If `saveMessageToDatabase()` creates the conversation (gets ID `X`), then the chat route also creates one (ID `Y`), the user message appears twice (under X from Path A, and under Y from Path B).

The idempotency check in `chat/route.ts:83–99` guards against duplicate user messages IF the conversation ID is passed. But if Path A creates the conversation and returns the ID asynchronously, there's a window where Path B runs before Path A's conversation ID is propagated.

**Evidence:** `conversationId` is passed to the API: `body: JSON.stringify({ question, prompt, conversationId: currentConversationId || savedConversationId })`. `savedConversationId` is only set after `saveMessageToDatabase()` resolves — if the API call starts before that, `conversationId` will be `null`.

---

## 3. DUPLICATE REQUESTS

### DR-01: History Fetched from Both Sidebar and Chat Page

On the chat page:
- Sidebar calls `GET /api/chat/history?limit=3`
- Chat page calls `GET /api/chat/history?limit=10`

These are two concurrent HTTP requests on every chat page load. Different `limit` values mean different Redis cache keys → no deduplication.

---

### DR-02: Dashboard N+1 Queries (State + DB)

`app/dashboard/page.tsx:96–253` (`fetchDocuments()`):

```
Promise.all([documents count, collections list, notes count])    → 3 parallel queries
collections.map(c => document_collections count for c.id)        → N queries (1 per collection)
recentCollections.map(c => {
  notes check for c.id                                            → N queries
  document_collections count for c.id                            → N queries (DUPLICATE!)
})
```

With 5 collections: `3 + 5 + 5 + 5 = 18 DB queries` to load the dashboard.  
`document_collections` count is fetched **twice** per collection (once for folders section, once for recent activity).

---

### DR-03: Exports Page N+1 Queries

`app/exports/page.tsx:76–116`:

```
collections.select()                              → 1 query
collections.map(c => notes.select().limit(1))     → N queries
```

With 10 collections: 11 DB queries, all sequential (inside `for...of` loop with `await`, not `Promise.all`).

---

## 4. INFINITE RE-RENDER RISKS

### IR-01: `showFormatOptions` Side Effect in textarea useEffect

```ts
useEffect(() => {
  if (input.length > 0 && !showFormatOptions) {
    setShowFormatOptions(true);
  }
}, [input, showFormatOptions]);
```

When `showFormatOptions` becomes `true`, `setShowFormatOptions(true)` is called again next render. React's bailout prevents infinite loop (same value), but this is fragile. If `showFormatOptions` were an object, it would loop infinitely.

---

## 5. HYDRATION ISSUES

### HY-01: `viewportHeight` State Using `100dvh`

`app/chat/page.tsx:209`: `const [viewportHeight, setViewportHeight] = useState('100dvh')`  
`100dvh` is a valid CSS unit. No hydration mismatch detected here.

---

## 6. RECOMMENDATIONS

| Issue | Fix | Priority |
|-------|-----|----------|
| RC-01: Double-fetch on mount | Remove `fetchUser()` or `INITIAL_SESSION` handler, not both | HIGH |
| RC-02: Re-fetch on navigation | Remove `pathname` from useEffect dep | HIGH |
| RC-03: Draft save during streaming | Gate draft save on streaming completion | MEDIUM |
| DR-01: Dual history requests | Use a shared React context or single fetch point | MEDIUM |
| DR-02: Dashboard N+1 | Batch with Supabase joins or single RPC | HIGH |
| DR-03: Exports N+1 | `Promise.all()` instead of `for...of await` | MEDIUM |
| SS-03: Dual save path | Ensure `conversationId` is always resolved before API call | HIGH |
