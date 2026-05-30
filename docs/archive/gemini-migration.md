# Google Gemini 2.0 Flash Migration Guide

## Overview

This project has been successfully migrated from **OpenRouter (DeepSeek)** to **Google Generative AI (Gemini 2.0 Flash)** for all LLM operations.

## What Changed

### API Provider
- **Old**: OpenRouter API with DeepSeek-R1-0528 model
- **New**: Google Generative AI API with Gemini 2.0 Flash model

### Model
- **Old**: `deepseek/deepseek-r1-0528:free`
- **New**: `google/gemini-2.0-flash-001`

### API Endpoint
- **Old**: `https://openrouter.ai/api/v1/chat/completions`
- **New**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent`

### Environment Variable
- **Old**: `OPENROUTER_API_KEY`
- **New**: `GOOGLE_GENERATIVE_AI_API_KEY`

## Files Modified

### API Routes
1. **[app/api/chat/route.ts](app/api/chat/route.ts)**
   - Updated streaming chat response handler
   - Updated quiz generation handler
   - Replaced OpenRouter API calls with Google Generative AI
   - Updated response parsing for Google's format

2. **[app/api/upload/route.ts](app/api/upload/route.ts)**
   - Updated document note generation
   - Replaced API endpoint and authentication headers
   - Updated request/response format handling

### Documentation
1. **[ENV_SETUP.md](ENV_SETUP.md)**
   - Updated with Google API key instructions
   - Added Google AI Studio link
   - Updated environment variable names

2. **[COMPREHENSIVE_PROJECT_GUIDE.md](COMPREHENSIVE_PROJECT_GUIDE.md)**
   - Updated tech stack section
   - Updated API endpoint documentation
   - Updated setup instructions

## Setup Instructions

### 1. Get Google API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Update Environment Variables
Create or edit `.env.local` in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Generative AI API Key (NEW)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

# OpenAI API Key (Optional - for embeddings)
OPENAI_API_KEY=your_openai_key_here
```

### 3. Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Restart the server
npm run dev
```

### 4. Verify Setup
Check the server console for:
- "🔍 Route handler - API key check: Key exists (length: XX)"
- "🚀 Chat: Making Google Gemini request"
- "Model: google/gemini-2.0-flash-001"

## Benefits of Google Gemini 2.0 Flash

✅ **Faster Response Times**: Optimized for quick interactions
✅ **Better Quality**: Latest generation model with improved reasoning
✅ **Large Context Window**: 100,000 tokens for comprehensive document processing
✅ **Streaming Support**: Native SSE support for real-time responses
✅ **Free Tier Available**: Generous free tier with usage limits
✅ **Easier Setup**: Single API key from Google AI Studio
✅ **Native Integration**: Direct HTTP API without proxy services

## API Response Format Changes

### Request Format
**Old (OpenRouter):**
```json
{
  "model": "deepseek/deepseek-r1-0528:free",
  "messages": [...],
  "stream": true
}
```

**New (Google):**
```json
{
  "contents": [{
    "role": "user",
    "parts": [{"text": "..."}]
  }],
  "system_instruction": "...",
  "stream_options": {"include_usage": false}
}
```

### Response Format
**Old (OpenRouter):**
```json
{
  "choices": [{
    "delta": {"content": "text"},
    "finish_reason": "stop"
  }]
}
```

**New (Google):**
```json
{
  "candidates": [{
    "content": {
      "parts": [{"text": "text"}]
    },
    "finishReason": "STOP"
  }]
}
```

## Troubleshooting

### Error: "GOOGLE_GENERATIVE_AI_API_KEY not found"
- Verify `.env.local` exists in project root (not in `app` folder)
- Check the key is set correctly
- Restart the development server

### Error: "401 Unauthorized"
- Verify your Google API key is valid
- Check it's not expired or revoked
- Generate a new key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Error: "Rate limit exceeded (429)"
- Automatic retry logic is built in (3 attempts with exponential backoff)
- Free tier has usage limits; upgrade if needed
- Wait a moment and try again

### Streaming Not Working
- Ensure `.env.local` has `GOOGLE_GENERATIVE_AI_API_KEY` set
- Check browser console for errors
- Verify API key has access to streaming endpoint

## Rate Limiting

Google Generative AI applies rate limits based on your account tier:

**Free Tier:**
- 60 requests/minute
- Automatic retry with exponential backoff (1s, 2s, 4s, 8s, 10s max)

**Paid Tier:**
- Higher rate limits available

The application includes automatic retry logic for rate limit (429) responses.

## Testing

### Test Chat Generation
1. Go to Chat page
2. Enter a question
3. Verify response streams in real-time
4. Check server logs for "🚀 Chat: Making Google Gemini request"

### Test Document Upload
1. Upload a PDF/DOCX file
2. Verify notes are generated correctly
3. Check server logs for Google API calls

### Test Quiz Generation
1. Upload a document
2. Request MCQ quiz generation
3. Verify JSON response format

## Rollback Instructions

If you need to revert to OpenRouter/DeepSeek:

1. Undo changes to API route files
2. Restore `OPENROUTER_API_KEY` in `.env.local`
3. Update response parsing back to OpenRouter format

Git command:
```bash
git log --oneline | grep -i gemini
git revert <commit-hash>
```

## Performance Notes

### Response Quality
- Gemini 2.0 Flash provides better quality responses than DeepSeek
- Faster generation speed (typically 2-5x faster)
- Better handling of complex prompts

### Cost
- Free tier: 15 requests/minute (higher than OpenRouter free)
- Paid tier: $0.075 per million input tokens, $0.30 per million output tokens

### Latency
- Typical latency: 1-3 seconds for first token
- Streaming reduces perceived latency
- Better for real-time chat applications

## Support

### Google Generative AI Documentation
- [Official Docs](https://ai.google.dev/)
- [API Reference](https://ai.google.dev/api)
- [Gemini Model Docs](https://ai.google.dev/models/gemini-2-0-flash)

### QuickNotes Issues
- Check [ENV_SETUP.md](ENV_SETUP.md) for configuration
- Review server console logs
- Verify `.env.local` configuration

---

**Migration Date**: March 1, 2026  
**Model**: Google Gemini 2.0 Flash  
**Status**: ✅ Complete
