# Environment Variables Setup

## OpenRouter Configuration (Primary AI Provider)

Your OpenRouter API key needs to be in `.env.local` file.

### Step 1: Create/Edit `.env.local`

Create or edit the file in the project root: `.env.local`

### Step 2: Add Your API Keys

Make sure your `.env.local` file contains:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter API Key (REQUIRED for chat & generation)
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# OpenAI API Key (Optional - for better embeddings)
OPENAI_API_KEY=sk-your-openai-key-here

# Fallback AI Key (Optional)
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-key-here
```

### Step 3: Get Your OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign in or create an account
3. Go to "Keys" section
4. Click "Create Key"
5. Copy the API key
6. Paste it into `.env.local` as `OPENROUTER_API_KEY`

### Step 4: Important Notes

- **NO spaces** around the `=` sign
- **NO quotes** around the key value
- **NO trailing spaces** at the end of the line
- The key should be on a single line
- **Vercel Deployment**: Make sure to add these environment variables in the Vercel Dashboard Settings -> Environment Variables.

### Step 5: Restart Server

**CRITICAL**: After adding/updating `.env.local`, you MUST restart your dev server:

1. Stop the server (press `Ctrl+C` in the terminal)
2. Start it again: `npm run dev`

### Step 6: Verify

Check the server console - you should see logs for API calls.
If you see "API key missing", verify Step 2 and Step 5.

## Model Information

### Primary: DeepSeek-R1
- **Model**: `deepseek/deepseek-r1`
- **Features**: Advanced reasoning, high quality, production-grade logic.

### Fallback: Llama 3 / Gemini
- **Model**: `meta-llama/llama-3.3-70b-instruct`, `google/gemini-2.0-flash-001`
- **Use Case**: Automatically used if primary model is busy or rate-limited.

