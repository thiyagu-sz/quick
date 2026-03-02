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
"[project]/AI-SAAS/app/api/chat/save/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/ssr/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    try {
        const supabaseUrl = ("TURBOPACK compile-time value", "https://wxpweyodcgnczgtnpebh.supabase.co");
        const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHdleW9kY2duY3pndG5wZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzI4NDQsImV4cCI6MjA4Nzk0ODg0NH0.1rDf9dqhAh3JPl62YAPogkc--fyUNRRPlGy4c5Glbew");
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        console.log('[chat/save] Environment check:', {
            hasUrl: !!supabaseUrl,
            hasAnonKey: !!supabaseAnonKey,
            hasServiceKey: !!supabaseServiceKey
        });
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // First, authenticate the user using cookies or bearer token
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createServerClient"])(supabaseUrl, supabaseAnonKey, {
            cookies: {
                get (name) {
                    return cookieStore.get(name)?.value;
                },
                set (name, value, options) {
                // RequestCookies in Next.js route handlers are read-only; no-op
                },
                remove (name) {
                // no-op
                }
            }
        });
        // If no user via cookies, we'll later try Authorization bearer token fallback
        let { data: { user }, error: userError } = await authClient.auth.getUser();
        // Fallback: if cookie-based auth failed, try bearer token from header
        if ((userError || !user) && request.headers.get('Authorization')?.startsWith('Bearer ')) {
            const authHeader = request.headers.get('Authorization');
            const token = authHeader.substring(7);
            const tokenClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            });
            const tokenAuth = await tokenClient.auth.getUser();
            if (tokenAuth.data.user && !tokenAuth.error) {
                user = tokenAuth.data.user;
                userError = null;
            }
        }
        if (userError || !user) {
            console.log('[chat/save] Auth failed:', userError?.message || 'No user');
            return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        console.log('[chat/save] User authenticated:', user.id);
        // Use service role key for database operations (bypasses RLS)
        // This is safe because we've already verified the user above
        const supabase = supabaseServiceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
            auth: {
                persistSession: false
            }
        }) : authClient; // Fallback to auth client if no service key
        const { title, messages, conversationId } = await request.json();
        // Title is only required for new conversations, not updates
        if (!conversationId && (!title || title.trim() === '')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Title is required for new conversations'
            }, {
                status: 400
            });
        }
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Messages array is required and must not be empty'
            }, {
                status: 400
            });
        }
        let conversation = null;
        if (conversationId) {
            // Update existing conversation
            const { data: existingConv, error: fetchError } = await supabase.from('chat_conversations').select('id, title').eq('id', conversationId).eq('user_id', user.id).single();
            if (fetchError || !existingConv) {
                console.error('Error fetching conversation:', fetchError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Conversation not found'
                }, {
                    status: 404
                });
            }
            conversation = existingConv;
            // Update updated_at timestamp
            await supabase.from('chat_conversations').update({
                updated_at: new Date().toISOString()
            }).eq('id', conversationId);
            // Get existing messages to avoid duplicates
            const { data: existingMessages } = await supabase.from('chat_messages').select('id, role, content').eq('conversation_id', conversationId).order('created_at', {
                ascending: true
            });
            // Find new messages (not already in database)
            const newMessages = messages.filter((msg)=>{
                return !existingMessages?.some((existing)=>existing.role === msg.role && existing.content === msg.content);
            });
            if (newMessages.length > 0) {
                const messagesToInsert = newMessages.map((msg)=>{
                    const messageData = {
                        conversation_id: conversation.id,
                        user_id: user.id,
                        role: msg.role,
                        content: msg.content
                    };
                    // Only add sources if it exists (column may not exist in older schemas)
                    if (msg.sources) {
                        messageData.sources = msg.sources;
                    }
                    return messageData;
                });
                const { error: messagesError } = await supabase.from('chat_messages').insert(messagesToInsert);
                if (messagesError) {
                    console.error('Error inserting new messages:', messagesError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to save messages'
                    }, {
                        status: 500
                    });
                }
            }
        } else {
            // Create new conversation
            const { data: newConv, error: convError } = await supabase.from('chat_conversations').insert({
                user_id: user.id,
                title: title
            }).select().single();
            if (convError || !newConv) {
                // Check if table doesn't exist (expected during initial setup)
                if (convError?.code === '42P01' || convError?.message?.includes('does not exist')) {
                    console.warn('chat_conversations table does not exist yet. Please run CHAT_SCHEMA.sql in Supabase.');
                    return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Database table not found. Please run CHAT_SCHEMA.sql in your Supabase SQL Editor.',
                        code: 'TABLE_NOT_FOUND'
                    }, {
                        status: 500
                    });
                }
                // Log other errors
                if (convError) {
                    console.error('Error creating conversation:', {
                        message: convError.message || 'Unknown error',
                        code: convError.code || 'No code',
                        details: convError.details || null,
                        hint: convError.hint || null
                    });
                }
                const errorMessage = convError?.message || convError?.code || 'Failed to create conversation';
                return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Failed to create conversation',
                    details: errorMessage
                }, {
                    status: 500
                });
            }
            conversation = newConv;
            // Insert all messages for new conversation
            const messagesToInsert = messages.map((msg)=>{
                const messageData = {
                    conversation_id: conversation.id,
                    user_id: user.id,
                    role: msg.role,
                    content: msg.content
                };
                // Only add sources if it exists (column may not exist in older schemas)
                if (msg.sources) {
                    messageData.sources = msg.sources;
                }
                return messageData;
            });
            const { error: messagesError } = await supabase.from('chat_messages').insert(messagesToInsert);
            if (messagesError) {
                console.error('Error inserting messages:', {
                    message: messagesError?.message || 'Unknown error',
                    code: messagesError?.code || 'No code',
                    details: messagesError?.details || null,
                    hint: messagesError?.hint || null
                });
                // Try to delete the conversation if messages fail
                await supabase.from('chat_conversations').delete().eq('id', conversation.id);
                const errorMessage = messagesError?.message || messagesError?.code || 'Failed to save messages';
                return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Failed to save messages',
                    details: errorMessage
                }, {
                    status: 500
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: conversation.id,
            title: conversation.title
        });
    } catch (error) {
        console.error('Save chat error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__483d5c51._.js.map