# Chat History Not Saving - Troubleshooting Guide

## Problem
Chat messages are not being saved to chat history, even though the `saveChat` toggle is enabled.

## Root Causes

### 1. **Database Tables Not Created**
The most common cause is that the required tables haven't been created in Supabase.

### Solution: Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of [COMPLETE_DATABASE_SETUP.sql](COMPLETE_DATABASE_SETUP.sql)
5. Click **Run**

**Alternative (Step-by-Step)**:

If you prefer to create tables individually, run these SQL commands in Supabase SQL Editor:

```sql
-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  sources JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);

-- Enable RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own chat_conversations"
ON chat_conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat_conversations"
ON chat_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat_conversations"
ON chat_conversations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat_conversations"
ON chat_conversations FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own chat_messages"
ON chat_messages FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat_messages"
ON chat_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat_messages"
ON chat_messages FOR DELETE
USING (auth.uid() = user_id);
```

## Verification Steps

### 1. Check if Tables Exist
In Supabase SQL Editor, run:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

You should see `chat_conversations` and `chat_messages` in the list.

### 2. Check RLS Policies
Run:
```sql
SELECT * FROM pg_policies WHERE tablename IN ('chat_conversations', 'chat_messages');
```

You should see 7 policies listed.

### 3. Check Browser Console
1. Open your app in browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Send a message
5. Look for logs like:
   - ✅ "User message saved, conversationId: ..."
   - ✅ "Conversation created: ..."

### 4. Verify in Supabase
1. After sending a message with save enabled
2. Go to Supabase Dashboard
3. Navigate to **Tables** > **chat_conversations**
4. You should see a new row with the conversation
5. Check **chat_messages** table for message rows

## Common Issues & Solutions

### Issue: "Failed to create conversation" Error

**Cause**: RLS policies are blocking writes

**Solution**:
1. Check if RLS is enabled: `ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;`
2. Make sure INSERT policy exists:
```sql
CREATE POLICY "Users can insert own chat_conversations"
ON chat_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);
```
3. Make sure user_id is included in INSERT:
```sql
INSERT INTO chat_conversations (user_id, title) VALUES (auth.uid(), 'Title');
```

### Issue: "TABLE_NOT_FOUND" Error

**Cause**: Tables haven't been created yet

**Solution**:
Run the complete SQL setup from [COMPLETE_DATABASE_SETUP.sql](COMPLETE_DATABASE_SETUP.sql)

### Issue: Messages save but don't appear in history sidebar

**Cause**: Sidebar might not be refreshing

**Solution**:
1. Hard refresh browser: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Clear localStorage:
   - Press **F12**
   - Go to **Application** tab
   - Click **Local Storage** > Your app URL
   - Delete all entries
   - Refresh page

### Issue: Only some messages are saved

**Cause**: saveChat toggle might be OFF

**Solution**:
Check the checkbox in the chat interface to enable "Save chat to history"

## Testing the Fix

1. **Open the app**
2. **Verify saveChat toggle is ON** (checkbox should be checked)
3. **Type a message** and hit send
4. **Check browser console** (F12 > Console):
   - Look for "✅ User message saved"
   - Look for "✅ Conversation created"
5. **Reload page**
6. **Check sidebar** - your conversation should appear
7. **Click conversation** - messages should load

## Debugging Steps

If messages still don't save:

### Step 1: Check Database Connection
```sql
SELECT auth.uid() as current_user;
```
If this returns NULL, authentication isn't working in RLS context.

### Step 2: Check API Response
Open browser DevTools (F12) → Network tab → Send a message → Look for `/api/chat/save` request:
- Check Status (should be 200)
- Click request → Preview tab
- Look for the conversation ID

### Step 3: Check RLS Policies
Run this to verify policies allow your user:
```sql
SELECT * FROM pg_policies WHERE tablename = 'chat_conversations';
```

### Step 4: Insert Test Message Directly
Run in Supabase SQL Editor (replace UUIDs with your values):
```sql
-- First insert conversation
INSERT INTO chat_conversations (user_id, title) 
VALUES ('your-user-id', 'Test') 
RETURNING id;

-- Then insert message (use ID from above)
INSERT INTO chat_messages (conversation_id, user_id, role, content)
VALUES ('conv-id', 'your-user-id', 'user', 'test message');
```

## Next Steps

After fixing:
1. Send a test message
2. Verify it appears in history sidebar
3. Refresh page to confirm persistence
4. Check Supabase dashboard to see saved data

If issues persist, check:
- Supabase project status (any incidents?)
- User authentication state
- Browser console for error messages
- Network tab in DevTools for API response errors

---

**Need more help?**
- Check [SUPABASE_SCHEMA.md](SUPABASE_SCHEMA.md) for schema details
- Review [ENV_SETUP.md](ENV_SETUP.md) for environment configuration
