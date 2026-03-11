# Environment Setup for QuickNotes

## AI Service (OpenRouter)
- `OPENROUTER_API_KEY`: Your OpenRouter API key.
- `OPENROUTER_PRIMARY_MODEL`: e.g., `deepseek/deepseek-chat`
- `OPENROUTER_FALLBACK_MODEL`: e.g., `google/gemini-2.0-flash-001`

## Rate Limiting (Upstash Redis)
- `UPSTASH_REDIS_REST_URL`: From Upstash dashboard.
- `UPSTASH_REDIS_REST_TOKEN`: From Upstash dashboard.

## Database & Auth (Supabase)
- `NEXT_PUBLIC_SUPABASE_URL`: From Supabase dashboard.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From Supabase dashboard.
- `SUPABASE_SERVICE_ROLE_KEY`: From Supabase dashboard (required for background processing).

## Deployment URL
- `NEXT_PUBLIC_SITE_URL`: Set to `http://localhost:3000` for local development or your production domain.
