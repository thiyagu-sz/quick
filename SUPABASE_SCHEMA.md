# Supabase Schema Documentation

## Overview

This document describes the complete database schema for the QuickNotes AI-SAAS application built with Supabase. The schema includes 9 main tables organized for managing collections, documents, notes, chat conversations, and user feedback.

## Key Features

- **Row Level Security (RLS)**: All tables have RLS enabled to ensure users can only access their own data
- **UUID Primary Keys**: All tables use UUID for unique identification
- **Timestamping**: Automatic `created_at` and `updated_at` tracking
- **Foreign Key Constraints**: Proper referential integrity with ON DELETE CASCADE
- **Indexing**: Performance-optimized indexes on frequently queried columns
- **Vector Support**: Built-in support for embeddings and vector search

---

## Tables

### 1. `collections`
Organizes user documents and notes into logical groupings.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | No | - | Foreign key to `auth.users` |
| `name` | TEXT | No | - | Collection name |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Yes | `NOW()` | Last update timestamp |

**Indexes:**
- `idx_collections_user_id` on `user_id`

**RLS Policies:**
- SELECT: Users can view own collections (`auth.uid() = user_id`)
- INSERT: Users can create own collections
- UPDATE: Users can update own collections
- DELETE: Users can delete own collections

---

### 2. `documents`
Stores uploaded documents with metadata.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | No | - | Foreign key to `auth.users` |
| `name` | TEXT | No | - | Document name |
| `file_type` | TEXT | Yes | - | File extension (pdf, doc, txt, etc.) |
| `file_size` | INTEGER | Yes | - | File size in bytes |
| `content` | TEXT | Yes | - | Full document content |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |

**Indexes:**
- `idx_documents_user_id` on `user_id`

**RLS Policies:**
- SELECT: Users can view own documents
- INSERT: Users can upload own documents
- UPDATE: Users can update own documents
- DELETE: Users can delete own documents

---

### 3. `document_chunks`
Stores chunked document content for vector search and embeddings.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `document_id` | UUID | Yes | - | Foreign key to `documents` (ON DELETE CASCADE) |
| `user_id` | UUID | No | - | Owner of the chunk |
| `content` | TEXT | No | - | Chunk text content |
| `embedding` | VECTOR(384) | Yes | - | Vector embedding for similarity search |
| `chunk_index` | INTEGER | Yes | - | Sequential chunk number |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |

**Indexes:**
- `idx_document_chunks_user_id` on `user_id`
- `idx_document_chunks_document_id` on `document_id`

**RLS Policies:**
- SELECT: Users can view own chunks
- INSERT: Users can insert own chunks
- DELETE: Users can delete own chunks

**Notes:**
- Uses pgvector extension for `VECTOR(384)` type
- Embeddings enable semantic search capabilities
- Automatically deleted when parent document is deleted

---

### 4. `document_collections`
Junction table linking documents to collections (many-to-many relationship).

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `document_id` | UUID | Yes | - | Foreign key to `documents` (ON DELETE CASCADE) |
| `collection_id` | UUID | Yes | - | Foreign key to `collections` (ON DELETE CASCADE) |
| `user_id` | UUID | No | - | Owner of the relationship |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |

**Indexes:**
- `idx_document_collections_user_id` on `user_id`

**RLS Policies:**
- SELECT: Users can view own document-collection relationships
- INSERT: Users can create own relationships
- DELETE: Users can remove own relationships

---

### 5. `notes`
Stores user-created notes, optionally linked to collections.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `collection_id` | UUID | Yes | - | Foreign key to `collections` (ON DELETE CASCADE) |
| `user_id` | UUID | No | - | Note owner |
| `content` | TEXT | No | - | Note content (markdown) |
| `format` | TEXT | Yes | - | Format type (markdown, plain, html) |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |

**Indexes:**
- `idx_notes_user_id` on `user_id`

**RLS Policies:**
- SELECT: Users can view own notes
- INSERT: Users can create own notes
- UPDATE: Users can update own notes
- DELETE: Users can delete own notes

---

### 6. `chat_conversations`
Stores AI chat conversation sessions.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | No | - | Foreign key to `auth.users` (ON DELETE CASCADE) |
| `title` | TEXT | No | - | Conversation title |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Yes | `NOW()` | Last message timestamp |

**Indexes:**
- `idx_chat_conversations_user_id` on `user_id`

**RLS Policies:**
- SELECT: Users can view own conversations
- INSERT: Users can create own conversations
- UPDATE: Users can update own conversations
- DELETE: Users can delete own conversations

**Notes:**
- Critical RLS policies ensure chat privacy
- `updated_at` tracks conversation activity

---

### 7. `chat_messages`
Stores individual messages within conversations.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `conversation_id` | UUID | Yes | - | Foreign key to `chat_conversations` (ON DELETE CASCADE) |
| `user_id` | UUID | No | - | Message sender |
| `role` | TEXT | No | - | Role: 'user' or 'assistant' |
| `content` | TEXT | No | - | Message content |
| `sources` | JSONB | Yes | - | Referenced documents/sources |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Message timestamp |

**Indexes:**
- `idx_chat_messages_user_id` on `user_id`
- `idx_chat_messages_conversation_id` on `conversation_id`

**RLS Policies:**
- SELECT: Users can view own messages
- INSERT: Users can insert own messages
- DELETE: Users can delete own messages

**Notes:**
- JSONB `sources` field stores referenced documents
- Role field distinguishes user vs assistant messages
- Automatically deleted when conversation is deleted

---

### 8. `feedback`
Stores user feedback and feature requests.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | Yes | - | Foreign key to `auth.users` (ON DELETE SET NULL) |
| `email` | TEXT | Yes | - | Feedback submitter email |
| `feedback_type` | TEXT | No | - | Type of feedback (bug, feature, other) |
| `message` | TEXT | No | - | Feedback content |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Submission timestamp |

**RLS Policies:**
- INSERT: Anyone can submit feedback (`true`)
- SELECT: Users can view own feedback

**Notes:**
- Allows anonymous feedback (email optional)
- Loose permissions for user engagement

---

### 9. `chat_exports`
Stores exported chat conversations in various formats.

**Columns:**
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | No | - | Foreign key to `auth.users` (ON DELETE CASCADE) |
| `conversation_id` | UUID | Yes | - | Foreign key to `chat_conversations` (ON DELETE SET NULL) |
| `title` | TEXT | No | - | Export title |
| `content` | TEXT | No | - | Exported content |
| `type` | TEXT | No | - | Export format (pdf, doc) |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Export timestamp |

**Columns Constraints:**
- `type` CHECK constraint: `IN ('pdf', 'doc')`

**Indexes:**
- `idx_chat_exports_user_id` on `user_id`
- `idx_chat_exports_conversation_id` on `conversation_id`

**RLS Policies:**
- SELECT: Users can view own exports
- INSERT: Users can create own exports
- DELETE: Users can delete own exports

---

## Database Extensions

The following PostgreSQL extensions are enabled:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- UUID generation
CREATE EXTENSION IF NOT EXISTS "vector";      -- Vector/embeddings support
```

---

## Row Level Security (RLS)

All tables have RLS enabled. The security model is simple but effective:

```
Users can only access rows where auth.uid() = user_id
```

### Enforcement Pattern

**SELECT (Read):**
```sql
USING (auth.uid() = user_id)
```

**INSERT (Create):**
```sql
WITH CHECK (auth.uid() = user_id)
```

**UPDATE (Modify):**
```sql
USING (auth.uid() = user_id)
```

**DELETE (Remove):**
```sql
USING (auth.uid() = user_id)
```

### RLS Verification

Run this query in Supabase to verify RLS is enabled:

```sql
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'collections',
  'documents', 
  'document_chunks',
  'document_collections',
  'notes',
  'chat_conversations',
  'chat_messages',
  'feedback',
  'chat_exports'
);
```

All tables should show `rowsecurity = true`.

---

## Data Relationships

### Entity Relationship Diagram

```
auth.users (Supabase built-in)
    ↓
    ├─→ collections
    │       ↓
    │   document_collections ←─ documents
    │       ↓
    │   notes
    │
    ├─→ documents
    │       ↓
    │   document_chunks (+ embeddings)
    │
    ├─→ chat_conversations
    │       ↓
    │   chat_messages
    │       ↓
    │   chat_exports
    │
    ├─→ feedback (loose coupling)
    │
    └─→ chat_exports
```

### Cascading Behavior

| Parent | Child | ON DELETE |
|--------|-------|-----------|
| documents | document_chunks | CASCADE |
| collections | document_collections | CASCADE |
| documents | document_collections | CASCADE |
| collections | notes | CASCADE |
| auth.users | chat_conversations | CASCADE |
| chat_conversations | chat_messages | CASCADE |
| chat_conversations | chat_exports | SET NULL |
| auth.users | documents | CASCADE |
| auth.users | feedback | SET NULL |

---

## Performance Indexes

All indexes use standard B-tree unless noted:

```sql
-- User-scoped queries (most common)
CREATE INDEX idx_collections_user_id ON collections(user_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_exports_user_id ON chat_exports(user_id);

-- Foreign key lookups
CREATE INDEX idx_document_chunks_document_id ON document_chunks(document_id);
CREATE INDEX idx_document_chunks_user_id ON document_chunks(user_id);
CREATE INDEX idx_document_collections_user_id ON document_collections(user_id);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_exports_conversation_id ON chat_exports(conversation_id);
```

---

## Deployment

### Initial Setup

Run the complete setup script in Supabase SQL Editor:

```bash
-- Execute COMPLETE_DATABASE_SETUP.sql
-- or
-- Execute SUPABASE_RLS_POLICIES.sql (if tables already exist)
```

### Files

- `COMPLETE_DATABASE_SETUP.sql` - Full initialization including tables and RLS
- `SUPABASE_RLS_POLICIES.sql` - RLS policies only (for existing databases)
- `DATABASE_PRODUCTION_CONSTRAINTS.sql` - Additional constraints for production

### Verification

After running setup scripts:

1. Check tables exist:
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```

2. Check RLS is enabled:
   ```sql
   SELECT * FROM pg_policies;
   ```

3. Test RLS (in authenticated context):
   ```sql
   SELECT * FROM chat_conversations;  -- Should only show own conversations
   ```

---

## Application Integration

### Client-side Usage (TypeScript/JavaScript)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(URL, KEY);

// Automatic RLS - only authenticated user's data returned
const { data, error } = await supabase
  .from('chat_conversations')
  .select('*');

// User ID is enforced by RLS
// No need to filter by user_id in queries
```

### Common Query Patterns

**Get user's conversations with messages:**
```sql
SELECT c.*, json_agg(m.*) as messages
FROM chat_conversations c
LEFT JOIN chat_messages m ON c.id = m.conversation_id
WHERE c.user_id = auth.uid()
GROUP BY c.id;
```

**Search documents with vector similarity:**
```sql
SELECT d.*, dc.embedding <-> query_embedding AS distance
FROM documents d
JOIN document_chunks dc ON d.id = dc.document_id
WHERE d.user_id = auth.uid()
ORDER BY dc.embedding <-> query_embedding
LIMIT 10;
```

---

## Future Enhancements

- [ ] Full-text search indexes on `documents.content`
- [ ] Materialized views for analytics
- [ ] Archive soft-delete pattern for conversations
- [ ] Share/collaboration tables for multi-user access
- [ ] Audit logging tables for compliance
- [ ] Cost tracking tables for SaaS billing

---

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [pgvector Documentation](https://github.com/pgvector/pgvector)

---

**Last Updated:** March 2026  
**Schema Version:** 1.0
