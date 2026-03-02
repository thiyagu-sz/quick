# Environment Variables Setup

## Google Generative AI (Gemini 2.0 Flash) Configuration

Your Google Generative AI API key needs to be in `.env.local` file.

### Step 1: Create/Edit `.env.local`

Create or edit the file: `ai-study-notes/.env.local`

### Step 2: Add Your API Keys

Make sure your `.env.local` file contains:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Generative AI API Key (REQUIRED for chat & generation)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_key_here

# OpenAI API Key (Optional - for better embeddings)
OPENAI_API_KEY=your_openai_key_here
```

### Step 3: Get Your Google Generative AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it into `.env.local` as `GOOGLE_GENERATIVE_AI_API_KEY`

### Step 4: Important Notes

- **NO spaces** around the `=` sign
- **NO quotes** around the key value
- **NO trailing spaces** at the end of the line
- The key should be on a single line

### Step 5: Restart Server

**CRITICAL**: After adding/updating `.env.local`, you MUST restart your dev server:

1. Stop the server (press `Ctrl+C` in the terminal)
2. Start it again: `npm run dev`

### Step 6: Verify

Check the server console - you should see logs like:
- "Route handler - API key check: Key exists (length: XX)"
- "🚀 Chat: Making Google Gemini request"
- "Model: google/gemini-2.0-flash-001"

If you still see errors, check:
1. The `.env.local` file is in the root `AI-SAAS` folder (not in `app` folder)
2. The file is named exactly `.env.local` (not `.env` or `env.local`)
3. The server was restarted after adding the key
4. Your Google API key is valid and active

## Model Information

### Gemini 2.0 Flash
- **Model**: `gemini-2.0-flash-001`
- **API**: Google Generative AI
- **Features**: 
  - Fast response times
  - Excellent for real-time chat
  - Strong reasoning capabilities
  - Cost-effective
- **Context Window**: 100,000 tokens
- **Rate Limits**: Free tier available with usage limits

