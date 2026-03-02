module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/AI-SAAS/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
// Rate limiting and retry logic
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRY_DELAY = 30000; // 30 seconds
async function sleepMs(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function generateEmbedding(text) {
    // Use a simple text-based embedding if OpenAI key is not available
    // This is a fallback - for production, use proper embeddings
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    // Helper function to generate fallback embedding
    const generateFallbackEmbedding = (inputText)=>{
        console.warn('Using fallback embedding (no OpenAI API key or API call failed)');
        const hash = inputText.split('').reduce((acc, char)=>{
            const hash = (acc << 5) - acc + char.charCodeAt(0);
            return hash & hash;
        }, 0);
        // Return a 384-dimensional vector (common embedding size) based on text hash
        return new Array(384).fill(0).map((_, i)=>Math.sin((hash + i) * 0.1) * 0.1);
    };
    if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
        return generateFallbackEmbedding(text);
    }
    try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-embedding-3-small',
                input: text
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.warn('OpenAI embedding API failed:', response.status, errorText);
            // Fall back to simple embedding instead of throwing
            return generateFallbackEmbedding(text);
        }
        const data = await response.json();
        if (data.data && data.data[0] && data.data[0].embedding) {
            return data.data[0].embedding;
        }
        // If response format is unexpected, use fallback
        console.warn('Unexpected OpenAI response format, using fallback embedding');
        return generateFallbackEmbedding(text);
    } catch (error) {
        console.warn('Error calling OpenAI embedding API:', error);
        // Fall back to simple embedding instead of throwing
        return generateFallbackEmbedding(text);
    }
}
async function searchSimilarChunks(supabase, userId, queryEmbedding, limit = 5) {
    // Call Supabase function to match documents
    // This assumes you have a match_documents function in Supabase
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: limit,
        user_id: userId
    });
    if (error) {
        console.error('RPC error:', error);
        // Fallback: manual similarity search
        return await manualSimilaritySearch(supabase, userId, queryEmbedding, limit);
    }
    return data || [];
}
async function manualSimilaritySearch(supabase, userId, queryEmbedding, limit) {
    // Get all chunks for the user
    const { data: chunks, error } = await supabase.from('document_chunks').select('*, documents(name)').eq('user_id', userId).limit(20); // Limit for better performance
    if (error || !chunks) {
        return [];
    }
    // Calculate cosine similarity (simplified)
    const chunksWithSimilarity = chunks.map((chunk)=>{
        const embedding = chunk.embedding;
        if (!embedding || !Array.isArray(embedding)) return {
            ...chunk,
            similarity: 0
        };
        // Cosine similarity
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for(let i = 0; i < Math.min(embedding.length, queryEmbedding.length); i++){
            dotProduct += embedding[i] * queryEmbedding[i];
            normA += embedding[i] * embedding[i];
            normB += queryEmbedding[i] * queryEmbedding[i];
        }
        const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        return {
            ...chunk,
            similarity
        };
    });
    // Sort by similarity and return top results
    return chunksWithSimilarity.sort((a, b)=>b.similarity - a.similarity).slice(0, limit);
}
async function streamChatResponse(question, context, sources) {
    const encoder = new TextEncoder();
    return new ReadableStream({
        async start (controller) {
            try {
                const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
                if (!apiKey) {
                    console.error('❌ GOOGLE_GEMINI_API_KEY not found in environment');
                    const fallbackMessage = `Google Gemini API key not found. Please add GOOGLE_GEMINI_API_KEY to .env.local and restart the server.`;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        error: fallbackMessage
                    })}\n\n`));
                    controller.close();
                    return;
                }
                let lastError = null;
                let retryDelay = INITIAL_RETRY_DELAY;
                let response = null;
                // Retry loop for handling rate limits and transient errors
                for(let attempt = 1; attempt <= MAX_RETRIES; attempt++){
                    try {
                        console.log(`🚀 Chat: Making Gemini request (attempt ${attempt}/${MAX_RETRIES})`);
                        console.log('  - Model: gemini-2.0-flash-001');
                        // Make the streaming request to Google Gemini
                        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:streamGenerateContent?key=${apiKey}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        role: 'user',
                                        parts: [
                                            {
                                                text: `You are an elite academic research assistant for QuickNotes. Create professional, publication-ready study notes.

IMPORTANT: Do NOT include any founder, developer, creator, or ownership information in the study notes. Focus ONLY on the user's study content.

STRUCTURE & FORMATTING:
- Start with # [Title]
- Follow with > [Executive Summary]
- Include ## Table of Contents with sections
- Use ## for main sections, ### for subsections
- Use markdown tables for comparisons
- Keep formatting clean and professional

${context ? `Context: ${context}\n\n` : ''}Task: Create comprehensive study notes for: ${question}`
                                            }
                                        ]
                                    }
                                ],
                                generationConfig: {
                                    temperature: 0.7,
                                    topK: 40,
                                    topP: 0.95,
                                    maxOutputTokens: 4096
                                }
                            })
                        });
                        console.log('📡 Response status:', response.status, response.statusText);
                        // Handle rate limiting with retry
                        if (response.status === 429) {
                            lastError = new Error('Rate limit exceeded');
                            const retryAfter = response.headers.get('retry-after');
                            // Parse retry-after: could be seconds (number) or HTTP-date
                            let delayMs = retryDelay;
                            if (retryAfter) {
                                const retryAfterNum = parseInt(retryAfter);
                                if (!isNaN(retryAfterNum)) {
                                    // If it's a small number, assume it's seconds; otherwise milliseconds
                                    delayMs = retryAfterNum > 100 ? retryAfterNum : retryAfterNum * 1000;
                                }
                            }
                            // Add jitter to avoid thundering herd
                            const jitter = Math.random() * 1000;
                            delayMs = Math.min(delayMs + jitter, MAX_RETRY_DELAY);
                            if (attempt < MAX_RETRIES) {
                                console.warn(`⚠️ Rate limit hit (429). Waiting ${Math.round(delayMs)}ms before retry (attempt ${attempt}/${MAX_RETRIES})...`);
                                await sleepMs(delayMs);
                                retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY);
                                continue; // Retry
                            }
                        }
                        if (!response.ok) {
                            const errorText = await response.text();
                            console.error('❌ Google Gemini API error:', response.status);
                            console.error('Error response:', errorText.substring(0, 200));
                            let errorMessage = 'Unknown error';
                            try {
                                const errorJson = JSON.parse(errorText);
                                errorMessage = errorJson.error?.message || errorJson.error || errorText;
                            } catch  {
                                errorMessage = errorText.substring(0, 200);
                            }
                            lastError = new Error(`API error ${response.status}: ${errorMessage}`);
                            // Don't retry on auth errors
                            if (response.status === 401) {
                                throw lastError;
                            }
                            // Retry on 5xx errors
                            if (response.status >= 500 && attempt < MAX_RETRIES) {
                                console.warn(`⚠️ Server error ${response.status}. Retrying...`);
                                await sleepMs(retryDelay);
                                retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY);
                                continue;
                            }
                            throw lastError;
                        }
                        break;
                    } catch (error) {
                        lastError = error;
                        if (attempt < MAX_RETRIES && !`${error}`.includes('401')) {
                            console.warn(`⚠️ Error on attempt ${attempt}/${MAX_RETRIES}. Retrying...`, error);
                            await sleepMs(retryDelay);
                            retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY);
                            continue;
                        }
                    }
                }
                if (!response || !response.ok) {
                    let userFriendlyError = 'Unknown error';
                    if (lastError) {
                        const errorStr = lastError.toString();
                        if (errorStr.includes('429') || errorStr.includes('Rate limit')) {
                            userFriendlyError = 'Rate limit exceeded. Please wait a moment and try again.';
                        } else if (errorStr.includes('401')) {
                            userFriendlyError = 'Authentication failed. Please verify your Google Gemini API key.';
                        } else if (errorStr.includes('500')) {
                            userFriendlyError = 'Google Gemini API is temporarily unavailable. Please try again later.';
                        } else {
                            userFriendlyError = errorStr.substring(0, 200);
                        }
                    }
                    const errorMsg = `Error: ${userFriendlyError}`;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        error: errorMsg
                    })}\n\n`));
                    controller.close();
                    return;
                }
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                if (!reader) {
                    throw new Error('No response body');
                }
                while(true){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    for (const line of lines){
                        // Skip empty lines
                        if (!line.trim()) continue;
                        try {
                            // Google Gemini returns JSON objects directly, not with 'data: ' prefix
                            const parsed = JSON.parse(line);
                            // Check for errors in response
                            if (parsed.error) {
                                console.error('Google Gemini API error in response:', parsed.error);
                                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                    error: parsed.error.message || 'API error',
                                    content: `Error: ${parsed.error.message || 'Unknown API error'}`
                                })}\n\n`));
                                controller.close();
                                return;
                            }
                            // Handle Gemini streaming response format
                            if (parsed.candidates && parsed.candidates[0]) {
                                const candidate = parsed.candidates[0];
                                const content = candidate.content?.parts?.[0]?.text;
                                if (content) {
                                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                        content
                                    })}\n\n`));
                                }
                                // End stream when we get finishReason
                                const finishReason = candidate.finishReason;
                                if (finishReason === 'STOP' || finishReason === 'MAX_TOKENS') {
                                    console.log('🏁 Detected finishReason:', finishReason, ', ending stream');
                                    // Send sources at the end
                                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                        sources
                                    })}\n\n`));
                                    controller.close();
                                    return;
                                }
                            }
                        } catch (parseError) {
                            // Skip invalid JSON - might be empty data lines or other non-JSON content
                            if (line && line !== '[DONE]') {
                                console.warn('Skipping non-JSON line:', line.substring(0, 50));
                            }
                        }
                    }
                }
                // Send sources at the end
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                    sources
                })}\n\n`));
                controller.close();
            } catch (error) {
                console.error('Streaming error:', error);
                const errorMessage = error instanceof Error ? error.message : 'Failed to get response from AI';
                const detailedError = `Error: ${errorMessage}\n\nPossible causes:\n1. Invalid or missing Google Gemini API key\n2. Network connection issue\n3. Model unavailable\n\nPlease check your .env.local file and ensure GOOGLE_GEMINI_API_KEY is set correctly.`;
                // Stream the error message
                const words = detailedError.split(' ');
                for(let i = 0; i < words.length; i++){
                    await new Promise((resolve)=>setTimeout(resolve, 20));
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        content: words[i] + (i < words.length - 1 ? ' ' : '')
                    })}\n\n`));
                }
                controller.close();
            }
        }
    });
}
async function handleQuizGeneration(question) {
    try {
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'Google Gemini API key not found'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        console.log('🎯 Generating quiz with Google Gemini API');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: question
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4096
                }
            })
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Google Gemini API error:', response.status, errorData);
            return new Response(JSON.stringify({
                error: 'Failed to generate quiz'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) {
            return new Response(JSON.stringify({
                error: 'No content received from API'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Return the content for client-side parsing
        return new Response(JSON.stringify({
            content
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Quiz generation error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to generate quiz'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
async function POST(request) {
    // Debug: Check API key at route level
    const routeLevelKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
    console.log('🔍 Route handler - API key check:');
    console.log('  - Key exists:', !!routeLevelKey);
    console.log('  - Key length:', routeLevelKey?.length || 0);
    try {
        const supabaseUrl = ("TURBOPACK compile-time value", "https://wxpweyodcgnczgtnpebh.supabase.co");
        const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHdleW9kY2duY3pndG5wZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzI4NDQsImV4cCI6MjA4Nzk0ODg0NH0.1rDf9dqhAh3JPl62YAPogkc--fyUNRRPlGy4c5Glbew");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Create Supabase client with cookie support (primary auth method for server routes)
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            cookies: {
                get (name) {
                    return cookieStore.get(name)?.value;
                }
            }
        });
        // Try cookie-based auth first (most reliable for Next.js server routes)
        let user = null;
        let authError = null;
        const cookieAuthResult = await supabase.auth.getUser();
        user = cookieAuthResult.data.user;
        authError = cookieAuthResult.error;
        // If cookie auth fails, try Bearer token from header as fallback
        if ((authError || !user) && request.headers.get('Authorization')?.startsWith('Bearer ')) {
            const authHeader = request.headers.get('Authorization');
            const token = authHeader.substring(7);
            // Create a client with the token in headers
            const tokenClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            });
            // Try to get user with token-based client
            const tokenAuthResult = await tokenClient.auth.getUser();
            if (tokenAuthResult.data.user && !tokenAuthResult.error) {
                user = tokenAuthResult.data.user;
                authError = null;
            }
        }
        if (authError) {
            console.error('❌ Auth error:', authError.message);
            return new Response(JSON.stringify({
                error: `Authentication failed: ${authError.message}`
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        if (!user) {
            console.error('❌ No user found - user not authenticated');
            return new Response(JSON.stringify({
                error: 'User not found. Please log in to use the chat feature'
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        console.log('✅ User authenticated:', user.id);
        const { question } = await request.json();
        if (!question || typeof question !== 'string') {
            return new Response(JSON.stringify({
                error: 'Question is required'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Check if this is a quiz generation request
        const isQuizRequest = (question.includes('multiple choice questions') || question.includes('quiz')) && (question.includes('JSON only') || question.includes('Return ONLY a valid JSON object') || question.includes('OUTPUT FORMAT (JSON only)'));
        if (isQuizRequest) {
            // Handle quiz generation with non-streaming response
            return handleQuizGeneration(question);
        }
        // Generate embedding for the question
        const questionEmbedding = await generateEmbedding(question);
        // Search for similar chunks
        const similarChunks = await searchSimilarChunks(supabase, user.id, questionEmbedding, 5);
        // Build context from chunks
        const context = similarChunks.map((chunk)=>chunk.content || '').join('\n\n---\n\n');
        // Extract unique source document names
        const sources = Array.from(new Set(similarChunks.map((chunk)=>chunk.documents?.name || 'Unknown').filter((name)=>name !== 'Unknown')));
        // Stream response
        const stream = await streamChatResponse(question, context || 'No relevant context found.', sources);
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive'
            }
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2e1147b5._.js.map