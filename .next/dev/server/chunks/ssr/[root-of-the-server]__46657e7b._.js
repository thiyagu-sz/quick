module.exports = [
"[project]/AI-SAAS/app/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSupabaseClient",
    ()=>clearSupabaseClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getSupabaseClient",
    ()=>getSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
// Singleton instance for client-side
let supabaseInstance = null;
function getSupabaseClient() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://wxpweyodcgnczgtnpebh.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHdleW9kY2duY3pndG5wZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzI4NDQsImV4cCI6MjA4Nzk0ODg0NH0.1rDf9dqhAh3JPl62YAPogkc--fyUNRRPlGy4c5Glbew");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Validate URL format
    try {
        new URL(supabaseUrl);
    } catch  {
        throw new Error(`Invalid Supabase URL: ${supabaseUrl}. Must be a valid HTTP or HTTPS URL.`);
    }
    // Return existing instance if available (singleton pattern)
    // This ensures the same client is used throughout the app session
    if (supabaseInstance) {
        return supabaseInstance;
    }
    // Create new client with proper auth configuration
    supabaseInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            // Use localStorage for session storage (default)
            storage: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
            // Ensure each browser tab shares the same session
            storageKey: 'quicknotes-auth-token'
        }
    });
    return supabaseInstance;
}
function clearSupabaseClient() {
    supabaseInstance = null;
}
const __TURBOPACK__default__export__ = getSupabaseClient;
}),
"[project]/AI-SAAS/app/components/StatusModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
'use client';
;
;
function StatusModal({ show, type, title, message, onClose }) {
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center justify-center w-14 h-14 mx-auto rounded-full mb-4 ${type === 'success' ? 'bg-green-100 text-green-600' : type === 'error' ? 'bg-red-100 text-red-600' : type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`,
                    children: type === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                        lineNumber: 26,
                        columnNumber: 33
                    }, this) : type === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                        lineNumber: 27,
                        columnNumber: 31
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                        lineNumber: 28,
                        columnNumber: 12
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-center text-gray-900 mb-2",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600 mb-6 text-sm leading-relaxed whitespace-pre-wrap",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: `w-full py-3 px-4 rounded-xl font-bold transition-all shadow-md active:scale-[0.98] ${type === 'success' ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' : type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200' : type === 'warning' ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'}`,
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI-SAAS/app/components/StatusModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI-SAAS/app/components/ConfirmationModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfirmationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
'use client';
;
;
function ConfirmationModal({ show, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, isLoading = false }) {
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center w-14 h-14 mx-auto rounded-full mb-4 bg-red-100 text-red-600",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                        className: "w-7 h-7"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-center text-gray-900 mb-2",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600 mb-6 text-sm leading-relaxed whitespace-pre-wrap",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            disabled: isLoading,
                            className: "flex-1 py-3 px-4 rounded-xl font-bold transition-all border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-50",
                            children: cancelLabel
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            disabled: isLoading,
                            className: "flex-1 py-3 px-4 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this) : confirmLabel
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI-SAAS/app/components/ConfirmationModal.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI-SAAS/app/components/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-ssr] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$StatusModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/components/StatusModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/components/ConfirmationModal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function Sidebar({ user }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userEmail, setUserEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showAllChats, setShowAllChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatToDelete, setChatToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusModal, setStatusModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        type: 'success',
        title: '',
        message: ''
    });
    const handleDeleteChat = (e, chatId)=>{
        e.preventDefault();
        e.stopPropagation();
        setChatToDelete(chatId);
        setShowDeleteConfirm(true);
    };
    const confirmDeleteChat = async ()=>{
        if (!chatToDelete) return;
        const chatId = chatToDelete;
        setDeletingId(chatId);
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(`/api/chat/delete?id=${chatId}`, {
                method: 'DELETE',
                headers: {
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                }
            });
            if (response.ok) {
                // Remove from local state
                setChatHistory((prev)=>prev.filter((c)=>c.id !== chatId));
                // If we're viewing this chat, redirect to /chat
                if (pathname === `/chat` && window.location.search.includes(chatId)) {
                    router.push('/chat');
                }
                setStatusModal({
                    show: true,
                    type: 'success',
                    title: 'Deleted',
                    message: 'Conversation deleted successfully.'
                });
            } else {
                setStatusModal({
                    show: true,
                    type: 'error',
                    title: 'Delete Failed',
                    message: 'Failed to delete conversation. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            setStatusModal({
                show: true,
                type: 'error',
                title: 'Error',
                message: 'An error occurred while deleting the conversation.'
            });
        } finally{
            setDeletingId(null);
            setChatToDelete(null);
            setShowDeleteConfirm(false);
        }
    };
    const loadChatHistory = async (userId)=>{
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            // Limit to 3 conversations for sidebar display
            const response = await fetch('/api/chat/history?limit=3', {
                headers: {
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                }
            });
            if (response.ok) {
                const data = await response.json();
                const conversations = data.conversations || [];
                console.log('Chat history loaded:', conversations.length, 'conversations');
                console.log('Conversations:', conversations);
                setChatHistory(conversations);
            } else {
                const errorData = await response.json().catch(()=>({}));
                console.error('Failed to load chat history:', response.status, errorData);
                setChatHistory([]);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            setChatHistory([]);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchUser = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (currentUser) {
                setUserEmail(currentUser.email || '');
                // Load chat history immediately
                await loadChatHistory(currentUser.id);
            }
        };
        fetchUser();
        // Also set up periodic refresh when on chat page
        if (pathname === '/chat') {
            const intervalId = setInterval(async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                const { data: { user: currentUser } } = await supabase.auth.getUser();
                if (currentUser) {
                    await loadChatHistory(currentUser.id);
                }
            }, 3000); // Refresh every 3 seconds when on chat page
            return ()=>clearInterval(intervalId);
        }
    }, [
        pathname
    ]);
    // Refresh chat history when on chat page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pathname === '/chat') {
            const fetchAndLoad = async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                const { data: { user: currentUser } } = await supabase.auth.getUser();
                if (currentUser) {
                    console.log('Loading chat history on chat page for user:', currentUser.id);
                    await loadChatHistory(currentUser.id);
                }
            };
            fetchAndLoad();
            // Also set up a small delay refresh to catch any saves that happened
            const timeoutId = setTimeout(()=>{
                fetchAndLoad();
            }, 1000);
            return ()=>clearTimeout(timeoutId);
        }
    }, [
        pathname
    ]);
    // Listen for chat save events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleChatSaved = async ()=>{
            console.log('Chat saved event received, reloading history...');
            // Small delay to ensure database write is complete
            setTimeout(async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                const { data: { user: currentUser } } = await supabase.auth.getUser();
                if (currentUser) {
                    await loadChatHistory(currentUser.id);
                }
            }, 500);
        };
        window.addEventListener('chatSaved', handleChatSaved);
        return ()=>window.removeEventListener('chatSaved', handleChatSaved);
    }, []);
    // Close mobile menu when route changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMobileMenuOpen(false);
    }, [
        pathname
    ]);
    const handleSignOut = async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
        // Get current user ID before signing out to clear their localStorage
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        await supabase.auth.signOut();
        // Clear the singleton instance to ensure clean state for next user
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSupabaseClient"])();
        // Clear chat history state
        setChatHistory([]);
        // Clear user-specific localStorage data
        if (currentUser?.id) {
            try {
                localStorage.removeItem(`ai_chat_draft_${currentUser.id}`);
            } catch (e) {}
        }
        // Also clear any old global key that might exist
        try {
            localStorage.removeItem('ai_chat_draft');
        } catch (e) {}
        router.push('/login');
    };
    const navItems = [
        {
            href: '/dashboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            label: 'Dashboard'
        },
        {
            href: '/upload',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
            label: 'Upload'
        },
        {
            href: '/chat',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
            label: 'AI Assistant'
        }
    ];
    const libraryItems = [
        {
            href: '/saved',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"],
            label: 'Saved Items'
        },
        {
            href: '/exports',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"],
            label: 'Exports'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                className: "lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors",
                "aria-label": "Toggle menu",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    className: "w-6 h-6 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40",
                onClick: ()=>setIsMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `h-[100dvh] w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 transform transition-transform duration-300 lg:relative lg:z-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-200 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/applogo.png?v=3",
                                    alt: "QuickNotes Logo",
                                    className: "h-10 sm:h-12 md:h-14 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(false),
                                className: "lg:hidden p-1 hover:bg-gray-100 rounded",
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-gray-600"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-4 space-y-1",
                        children: [
                            navItems.map((item)=>{
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this);
                            }),
                            pathname === '/chat' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6 mt-6 border-t border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                                        children: "Previous Conversations"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    chatHistory.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: chatHistory.map((chat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/chat?id=${chat.id}`,
                                                        className: "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 pr-10",
                                                        onClick: ()=>setIsMobileMenuOpen(false),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                className: "w-4 h-4 text-gray-400 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm truncate flex-1",
                                                                children: chat.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>handleDeleteChat(e, chat.id),
                                                        disabled: deletingId === chat.id,
                                                        className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50",
                                                        title: "Delete conversation",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, chat.id, true, {
                                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-3 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: "No saved conversations yet"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 344,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6 mt-6 border-t border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                                        children: "Library"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                        lineNumber: 351,
                                        columnNumber: 11
                                    }, this),
                                    libraryItems.map((item)=>{
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            className: `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                lineNumber: 350,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                        lineNumber: 293,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-gray-200 space-y-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 rounded-lg p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                lineNumber: 379,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 378,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-gray-900 truncate",
                                                    children: user?.user_metadata?.full_name || 'User'
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 truncate",
                                                    children: userEmail
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 381,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                    lineNumber: 377,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSignOut,
                                    className: "w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 392,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Sign out"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                            lineNumber: 393,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                                    lineNumber: 388,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                            lineNumber: 376,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                        lineNumber: 375,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: showDeleteConfirm,
                title: "Delete Conversation",
                message: "Are you sure you want to delete this conversation? This action cannot be undone.",
                confirmLabel: "Delete",
                cancelLabel: "Cancel",
                onConfirm: confirmDeleteChat,
                onCancel: ()=>{
                    setShowDeleteConfirm(false);
                    setChatToDelete(null);
                },
                isLoading: deletingId !== null
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$StatusModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: statusModal.show,
                type: statusModal.type,
                title: statusModal.title,
                message: statusModal.message,
                onClose: ()=>setStatusModal((prev)=>({
                            ...prev,
                            show: false
                        }))
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/Sidebar.tsx",
                lineNumber: 414,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/AI-SAAS/app/components/FeedbackForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedbackForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
const FEEDBACK_CATEGORIES = [
    {
        value: 'bug',
        label: '🐛 Bug Report'
    },
    {
        value: 'feature',
        label: '💡 Feature Request'
    },
    {
        value: 'improvement',
        label: '⚡ Improvement Suggestion'
    },
    {
        value: 'experience',
        label: '😊 User Experience'
    },
    {
        value: 'performance',
        label: '⚙️ Performance'
    },
    {
        value: 'documentation',
        label: '📚 Documentation'
    },
    {
        value: 'other',
        label: '🤔 Other'
    }
];
const FEATURE_OPTIONS = [
    'PDF Export',
    'Note Taking',
    'Chat History',
    'Search Functionality',
    'Document Upload',
    'Formatting Options',
    'Mobile Experience',
    'Authentication'
];
function FeedbackForm({ userId, userEmail, onClose, onSubmitSuccess }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        rating: 5,
        category: 'feature',
        title: '',
        message: '',
        email: userEmail || '',
        features: [],
        improvements: '',
        wouldRecommend: true
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitStatus, setSubmitStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        type: null,
        message: ''
    });
    // Validation
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must not exceed 100 characters';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Feedback message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.length > 2000) {
            newErrors.message = 'Message must not exceed 2000 characters';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (formData.category === 'improvement' && !formData.improvements?.trim()) {
            newErrors.improvements = 'Please specify your improvement suggestion';
        }
        if (formData.category === 'bug' && formData.features?.length === 0) {
            newErrors.features = 'Please select which feature has the issue';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle feature selection
    const toggleFeature = (feature)=>{
        setFormData((prev)=>({
                ...prev,
                features: prev.features?.includes(feature) ? prev.features.filter((f)=>f !== feature) : [
                    ...prev.features || [],
                    feature
                ]
            }));
    };
    // Handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            setSubmitStatus({
                type: 'error',
                message: 'Please fix the errors above before submitting.'
            });
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus({
            type: null,
            message: ''
        });
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userId,
                    timestamp: new Date().toISOString()
                })
            });
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your feedback has been submitted successfully.'
            });
            // Reset form
            setFormData({
                rating: 5,
                category: 'feature',
                title: '',
                message: '',
                email: userEmail || '',
                features: [],
                improvements: '',
                wouldRecommend: true
            });
            setErrors({});
            // Call success callback after 1.5 seconds
            setTimeout(()=>{
                onSubmitSuccess?.();
            }, 1500);
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit feedback. Please try again later.'
            });
            console.error('Feedback submission error:', error);
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white border border-gray-200 rounded-t-2xl sm:rounded-2xl shadow-xl max-w-2xl w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between rounded-t-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg sm:text-2xl font-bold text-gray-900",
                                    children: "Share Your Feedback"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-4 sm:p-6 space-y-3 sm:space-y-6 overflow-y-auto flex-1",
                    children: [
                        submitStatus.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-start gap-3 p-4 rounded-lg border ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`,
                            children: [
                                submitStatus.type === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    className: "w-5 h-5 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-5 h-5 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: submitStatus.message
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: "How would you rate your experience?"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFormData((prev)=>({
                                                        ...prev,
                                                        rating: num
                                                    })),
                                            className: `w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-base sm:text-lg transition-all ${formData.rating === num ? 'bg-blue-600 text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                            children: num
                                        }, num, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-2",
                                    children: "1 = Poor, 5 = Excellent"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "Feedback Category ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 241,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: formData.category,
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                category: e.target.value
                                            })),
                                    className: "w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors",
                                    children: FEEDBACK_CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: cat.value,
                                            children: cat.label
                                        }, cat.value, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this),
                        formData.category === 'bug' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "Which feature has the issue? ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 260,
                                            columnNumber: 46
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: FEATURE_OPTIONS.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>toggleFeature(feature),
                                            className: `p-2.5 sm:p-3 rounded-lg border transition-all text-xs sm:text-sm font-medium ${formData.features?.includes(feature) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'}`,
                                            children: feature
                                        }, feature, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this),
                                errors.features && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-400 text-sm mt-2",
                                    children: errors.features
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 279,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        formData.category === 'improvement' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "What could be improved? ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 288,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: formData.improvements || '',
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                improvements: e.target.value
                                            })),
                                    placeholder: "Describe your improvement idea...",
                                    className: "w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors min-h-20 sm:min-h-24 resize-none"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                errors.improvements && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-400 text-sm mt-1",
                                    children: errors.improvements
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 297,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "Feedback Title ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 305,
                                            columnNumber: 30
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: formData.title,
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                title: e.target.value
                                            })),
                                    placeholder: "Brief summary of your feedback",
                                    maxLength: 100,
                                    className: `w-full bg-white text-gray-900 border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.title ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'}`
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mt-2",
                                    children: [
                                        errors.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm",
                                            children: errors.title
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 318,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 ml-auto",
                                            children: [
                                                formData.title.length,
                                                "/100"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "Detailed Feedback ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 328,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: formData.message,
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                message: e.target.value
                                            })),
                                    placeholder: "Please provide detailed feedback. What went well? What could be improved?",
                                    maxLength: 2000,
                                    className: `w-full bg-white text-gray-900 border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors min-h-28 sm:min-h-32 resize-none ${errors.message ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'}`
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mt-2",
                                    children: [
                                        errors.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm",
                                            children: errors.message
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 340,
                                            columnNumber: 34
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 ml-auto",
                                            children: [
                                                formData.message.length,
                                                "/2000"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 339,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base",
                                    children: [
                                        "Email Address ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                            lineNumber: 350,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: formData.email,
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                email: e.target.value
                                            })),
                                    placeholder: "your@email.com",
                                    className: `w-full bg-white text-gray-900 border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'}`
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this),
                                errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500 text-sm mt-1",
                                    children: errors.email
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 361,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-1",
                                    children: "We'll use this to follow up on your feedback if needed"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 348,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 sm:gap-3 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: formData.wouldRecommend,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    wouldRecommend: e.target.checked
                                                })),
                                        className: "w-4 h-4 sm:w-5 sm:h-5 rounded bg-white border border-gray-300 cursor-pointer accent-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-900 font-medium text-sm sm:text-base",
                                        children: "I would recommend this app to others"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 368,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky bottom-0 bg-white border-t border-gray-100 p-4 sm:p-0 sm:bg-transparent sm:border-t-0 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4",
                            children: [
                                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "px-4 sm:px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    className: "flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base",
                                    children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                                lineNumber: 400,
                                                columnNumber: 19
                                            }, this),
                                            "Submitting..."
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this),
                                            "Submit Feedback"
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI-SAAS/app/components/FeedbackForm.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI-SAAS/app/lib/markdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderMarkdown",
    ()=>renderMarkdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function renderMarkdown(text) {
    const lines = text.split('\n');
    const elements = [];
    let currentParagraph = [];
    let inList = false;
    let listItems = [];
    let listType = 'ul';
    let inTable = false;
    let tableRows = [];
    let tableHeaders = [];
    const flushParagraph = ()=>{
        if (currentParagraph.length > 0) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 last:mb-0 text-left leading-relaxed",
                children: formatInlineMarkdown(currentParagraph.join(' '))
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this));
            currentParagraph = [];
        }
    };
    const flushList = ()=>{
        if (listItems.length > 0) {
            const ListComponent = listType === 'ol' ? 'ol' : 'ul';
            const listClassName = listType === 'ol' ? 'list-decimal list-outside mb-4 space-y-2 text-left pl-6' : 'list-disc list-outside mb-4 space-y-2 text-left pl-6';
            elements.push(/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(ListComponent, {
                key: elements.length,
                className: listClassName
            }, listItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "text-left leading-relaxed",
                    children: formatInlineMarkdown(item)
                }, idx, false, {
                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                    lineNumber: 38,
                    columnNumber: 13
                }, this))));
            listItems = [];
            inList = false;
        }
    };
    const flushTable = ()=>{
        if (tableRows.length > 0) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full border-collapse border border-gray-300 text-sm",
                    children: [
                        tableHeaders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-gray-50",
                                children: tableHeaders.map((header, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900",
                                        children: formatInlineMarkdown(header.trim())
                                    }, idx, false, {
                                        fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                                        lineNumber: 56,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                                lineNumber: 54,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                            lineNumber: 53,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: tableRows.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-25',
                                    children: row.map((cell, cellIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border border-gray-300 px-3 py-2 text-left text-gray-700",
                                            children: formatInlineMarkdown(cell.trim())
                                        }, cellIdx, false, {
                                            fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                                            lineNumber: 70,
                                            columnNumber: 21
                                        }, this))
                                }, rowIdx, false, {
                                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this)
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this));
            tableRows = [];
            tableHeaders = [];
            inTable = false;
        }
    };
    lines.forEach((line, index)=>{
        const trimmed = line.trim();
        // Table detection (pipe-separated values)
        if (trimmed.includes('|') && trimmed.split('|').length >= 2) {
            flushParagraph();
            flushList();
            let cells = trimmed.split('|');
            // Remove leading/trailing empty cells (from leading/trailing pipes)
            if (cells[0].trim() === '') cells.shift();
            if (cells[cells.length - 1].trim() === '') cells.pop();
            cells = cells.map((cell)=>cell.trim());
            // Check if this is a separator row (contains only dashes, spaces, colons, and pipes)
            const isSeparatorRow = /^[\s\|\-:]+$/.test(trimmed);
            if (!isSeparatorRow && cells.length > 0) {
                if (!inTable) {
                    inTable = true;
                    tableHeaders = cells;
                } else {
                    // Pad cells to match header count for consistent table structure
                    while(cells.length < tableHeaders.length){
                        cells.push('');
                    }
                    tableRows.push(cells.slice(0, tableHeaders.length));
                }
            }
            return;
        } else if (inTable) {
            // End of table
            flushTable();
        }
        // Headings
        if (trimmed.startsWith('### ')) {
            flushList();
            flushTable();
            flushParagraph();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-bold mt-6 mb-3 text-gray-900 text-left leading-tight",
                children: formatInlineMarkdown(trimmed.slice(4))
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this));
            return;
        }
        if (trimmed.startsWith('## ')) {
            flushList();
            flushTable();
            flushParagraph();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold mt-6 mb-3 text-gray-900 text-left leading-tight",
                children: formatInlineMarkdown(trimmed.slice(3))
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this));
            return;
        }
        if (trimmed.startsWith('# ')) {
            flushList();
            flushTable();
            flushParagraph();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold mt-6 mb-4 text-gray-900 text-left leading-tight",
                children: formatInlineMarkdown(trimmed.slice(2))
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this));
            return;
        }
        // MCQ Options (A., B., C., D.)
        if (trimmed.match(/^[A-D]\.\s+/)) {
            flushParagraph();
            flushTable();
            flushList();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 pl-4 text-left leading-relaxed",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-gray-800",
                        children: trimmed.slice(0, 2)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2",
                        children: formatInlineMarkdown(trimmed.slice(3))
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this)
                ]
            }, elements.length, true, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this));
            return;
        }
        // MCQ Question numbering (Q1., Q2., etc.)
        if (trimmed.match(/^Q\d+\.\s+/)) {
            flushParagraph();
            flushTable();
            flushList();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 mb-4 text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-semibold text-gray-900 text-base leading-relaxed",
                    children: formatInlineMarkdown(trimmed)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this)
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this));
            return;
        }
        // Correct Answer line
        if (trimmed.match(/^Correct Answer:\s+/)) {
            flushParagraph();
            flushTable();
            flushList();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 mb-2 text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold text-green-700 bg-green-50 px-2 py-1 rounded text-sm",
                    children: trimmed
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this)
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this));
            return;
        }
        // Explanation line
        if (trimmed.match(/^Explanation:\s+/)) {
            flushParagraph();
            flushTable();
            flushList();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-600 italic text-sm leading-relaxed",
                    children: formatInlineMarkdown(trimmed)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this)
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this));
            return;
        }
        // Horizontal rule for MCQ separation
        if (trimmed === '---') {
            flushParagraph();
            flushTable();
            flushList();
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "my-6 border-t border-gray-200"
            }, elements.length, false, {
                fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, this));
            return;
        }
        // Lists
        if (trimmed.match(/^[-*]\s+/)) {
            flushParagraph();
            flushTable();
            if (!inList) {
                inList = true;
                listType = 'ul';
            }
            listItems.push(trimmed.replace(/^[-*]\s+/, ''));
            return;
        }
        if (trimmed.match(/^\d+\.\s+/)) {
            flushParagraph();
            flushTable();
            if (!inList || listType === 'ul') {
                if (inList) flushList();
                inList = true;
                listType = 'ol';
            }
            listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
            return;
        }
        // Regular paragraph
        if (trimmed.length > 0) {
            flushList();
            flushTable();
            currentParagraph.push(trimmed);
        } else {
            flushList();
            flushTable();
            flushParagraph();
        }
    });
    flushList();
    flushTable();
    flushParagraph();
    return elements.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: elements
    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: text
    }, void 0, false, {
        fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
        lineNumber: 270,
        columnNumber: 50
    }, this);
}
function formatInlineMarkdown(text) {
    // Bold
    const parts = [];
    let currentIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    while((match = boldRegex.exec(text)) !== null){
        if (match.index > currentIndex) {
            parts.push(text.slice(currentIndex, match.index));
        }
        parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            className: "font-semibold text-gray-900",
            children: match[1]
        }, match.index, false, {
            fileName: "[project]/AI-SAAS/app/lib/markdown.tsx",
            lineNumber: 284,
            columnNumber: 16
        }, this));
        currentIndex = match.index + match[0].length;
    }
    if (currentIndex < text.length) {
        parts.push(text.slice(currentIndex));
    }
    return parts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: parts
    }, void 0, false) : text;
}
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/AI-SAAS/app/lib/clientPdfGenerator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientPDFGenerator",
    ()=>ClientPDFGenerator,
    "generateClientPDF",
    ()=>generateClientPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
;
class ClientPDFGenerator {
    doc;
    pageWidth;
    pageHeight;
    margin = 20;
    contentWidth;
    currentY;
    lineHeight = 7;
    defaultFontSize = 11;
    brandColor = [
        94,
        79,
        255
    ];
    pageNumber = 1;
    constructor(){
        this.doc = new __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();
        this.contentWidth = this.pageWidth - this.margin * 2;
        this.currentY = this.margin;
    }
    /**
   * Check if space is available, otherwise create new page
   */ checkPageBreak(requiredSpace = this.lineHeight) {
        if (this.currentY + requiredSpace > this.pageHeight - this.margin - 15) {
            this.doc.addPage();
            this.pageNumber++;
            this.currentY = this.margin;
            this.addPageHeader();
            return true;
        }
        return false;
    }
    /**
   * Add subtle page header after first page
   */ addPageHeader() {
        if (this.pageNumber > 1) {
            this.doc.setDrawColor(200, 200, 210);
            this.doc.setLineWidth(0.3);
            this.doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
            this.currentY += 6;
        }
    }
    /**
   * Add footer with page numbers and branding
   */ addPageFooters() {
        const totalPages = this.doc.getNumberOfPages();
        for(let i = 1; i <= totalPages; i++){
            this.doc.setPage(i);
            // Page number
            this.doc.setFontSize(9);
            this.doc.setTextColor(140, 140, 150);
            this.doc.text(`Page ${i} of ${totalPages}`, this.pageWidth / 2, this.pageHeight - 10, {
                align: 'center'
            });
            // Footer text
            this.doc.setFontSize(8);
            this.doc.text('© Generated using QuickNotes — AI Study Assistant | www.quicknotess.space', this.pageWidth / 2, this.pageHeight - 5, {
                align: 'center'
            });
            this.doc.setTextColor(0, 0, 0);
        }
    }
    /**
   * Add wrapped text with proper formatting
   */ addWrappedText(text, fontSize = this.defaultFontSize, isBold = false, color = [
        26,
        26,
        26
    ]) {
        this.doc.setFontSize(fontSize);
        this.doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        this.doc.setTextColor(...color);
        const lines = this.doc.splitTextToSize(text, this.contentWidth);
        for (const line of lines){
            this.checkPageBreak();
            this.doc.text(line, this.margin, this.currentY);
            this.currentY += this.lineHeight;
        }
    }
    /**
   * Add professional cover page
   */ addCoverPage(title) {
        // Background color
        this.doc.setFillColor(245, 247, 250);
        this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
        this.currentY = this.margin + 40;
        // Logo/branding
        this.doc.setFontSize(20);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(...this.brandColor);
        this.doc.text('📚 QuickNotes', this.pageWidth / 2, this.currentY, {
            align: 'center'
        });
        this.currentY += 8;
        // Tagline
        this.doc.setFontSize(10);
        this.doc.setTextColor(120, 120, 130);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text('AI-Powered Study Assistant', this.pageWidth / 2, this.currentY, {
            align: 'center'
        });
        this.currentY += 30;
        // Title
        this.doc.setFontSize(28);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(26, 26, 26);
        const titleLines = this.doc.splitTextToSize(title, this.contentWidth - 20);
        titleLines.forEach((line)=>{
            this.doc.text(line, this.pageWidth / 2, this.currentY, {
                align: 'center'
            });
            this.currentY += 12;
        });
        this.currentY += 20;
        // Date
        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        this.doc.setFontSize(11);
        this.doc.setTextColor(100, 100, 110);
        this.doc.text(`Generated: ${today}`, this.pageWidth / 2, this.currentY, {
            align: 'center'
        });
        // Decorative line
        this.currentY += 20;
        this.doc.setDrawColor(...this.brandColor);
        this.doc.setLineWidth(1);
        this.doc.line(this.pageWidth / 2 - 40, this.currentY, this.pageWidth / 2 + 40, this.currentY);
        // Add page break
        this.doc.addPage();
        this.pageNumber++;
        this.currentY = this.margin;
    }
    /**
   * Parse markdown content and render to PDF
   */ parseMarkdownContent(content) {
        const lines = content.split('\n');
        let inList = false;
        let inCodeBlock = false;
        let codeBlockContent = [];
        for (const line of lines){
            const trimmed = line.trim();
            // Handle empty lines
            if (!trimmed) {
                if (inList) {
                    this.currentY += 3;
                    inList = false;
                }
                this.currentY += 4;
                continue;
            }
            // Handle code blocks
            if (trimmed.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockContent = [];
                } else {
                    inCodeBlock = false;
                    this.renderCodeBlock(codeBlockContent);
                    codeBlockContent = [];
                }
                continue;
            }
            if (inCodeBlock) {
                codeBlockContent.push(line);
                continue;
            }
            // Handle headings
            if (trimmed.startsWith('# ')) {
                this.ensureHeadingSpace(25);
                this.currentY += 5;
                this.addWrappedText(trimmed.slice(2), 20, true, this.brandColor);
                this.currentY += 8;
                continue;
            }
            if (trimmed.startsWith('## ')) {
                this.ensureHeadingSpace(20);
                this.currentY += 3;
                this.addWrappedText(trimmed.slice(3), 16, true);
                // Underline
                this.doc.setDrawColor(...this.brandColor);
                this.doc.setLineWidth(0.5);
                this.doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
                this.currentY += 8;
                continue;
            }
            if (trimmed.startsWith('### ')) {
                this.ensureHeadingSpace(15);
                this.currentY += 2;
                this.addWrappedText(trimmed.slice(4), 13, true, [
                    50,
                    50,
                    60
                ]);
                this.currentY += 4;
                continue;
            }
            // Handle MCQ format
            if (trimmed.match(/^Q\d+\./)) {
                this.ensureHeadingSpace(18);
                this.currentY += 3;
                this.addWrappedText(trimmed, 12, true);
                this.currentY += 3;
                continue;
            }
            if (trimmed.match(/^[A-D]\./) && !trimmed.startsWith('A]')) {
                this.checkPageBreak(this.lineHeight + 2);
                this.addWrappedText(`  ${trimmed}`, 11, false, [
                    50,
                    50,
                    60
                ]);
                this.currentY += 2;
                continue;
            }
            if (trimmed.startsWith('Correct Answer:')) {
                this.checkPageBreak(this.lineHeight + 4);
                this.doc.setFillColor(220, 252, 231);
                this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, this.lineHeight + 4, 'F');
                this.addWrappedText(trimmed, 11, true, [
                    22,
                    163,
                    74
                ]);
                this.currentY += 3;
                continue;
            }
            if (trimmed.startsWith('Explanation:')) {
                this.checkPageBreak(this.lineHeight + 2);
                this.addWrappedText(trimmed, 10, false, [
                    100,
                    100,
                    110
                ]);
                this.currentY += 3;
                continue;
            }
            // Handle lists
            if (trimmed.match(/^[-•*]\s/)) {
                this.checkPageBreak(this.lineHeight + 2);
                if (!inList) {
                    inList = true;
                    this.currentY += 2;
                }
                const listText = trimmed.replace(/^[-•*]\s/, '');
                this.addWrappedText(`• ${listText}`, 11, false, [
                    50,
                    50,
                    60
                ]);
                this.currentY += 2;
                continue;
            }
            if (trimmed.startsWith('> ')) {
                this.ensureHeadingSpace(15);
                this.currentY += 2;
                this.doc.setFillColor(245, 243, 255);
                this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, this.lineHeight + 4, 'F');
                this.doc.setDrawColor(...this.brandColor);
                this.doc.setLineWidth(1);
                this.doc.line(this.margin, this.currentY - 2, this.margin, this.currentY + this.lineHeight + 2);
                this.addWrappedText(`  ${trimmed.slice(2)}`, 10, false, [
                    75,
                    85,
                    99
                ]);
                this.currentY += 3;
                continue;
            }
            // Regular paragraph
            if (inList) {
                inList = false;
                this.currentY += 3;
            }
            this.checkPageBreak(this.lineHeight + 2);
            let displayText = trimmed;
            const isBold = trimmed.includes('**');
            if (isBold) {
                displayText = trimmed.replace(/\*\*(.*?)\*\*/g, '$1');
            }
            this.addWrappedText(displayText, this.defaultFontSize, isBold, [
                50,
                50,
                60
            ]);
            this.currentY += 3;
        }
    }
    /**
   * Ensure space for heading, accounting for styling
   */ ensureHeadingSpace(space) {
        if (this.currentY + space > this.pageHeight - this.margin - 15) {
            this.doc.addPage();
            this.pageNumber++;
            this.currentY = this.margin;
            this.addPageHeader();
        }
    }
    /**
   * Render code block with styling
   */ renderCodeBlock(lines) {
        if (lines.length === 0) return;
        this.ensureHeadingSpace(lines.length * this.lineHeight + 10);
        this.currentY += 3;
        this.doc.setFillColor(240, 240, 245);
        this.doc.rect(this.margin, this.currentY - 3, this.contentWidth, lines.length * this.lineHeight + 6, 'F');
        this.doc.setFont('courier', 'normal');
        this.doc.setFontSize(9);
        this.doc.setTextColor(50, 50, 60);
        lines.forEach((line)=>{
            this.doc.text(line.substring(0, 90), this.margin + 3, this.currentY + 2);
            this.currentY += this.lineHeight;
        });
        this.doc.setFont('helvetica', 'normal');
        this.currentY += 5;
    }
    /**
   * Generate PDF and return as blob
   */ generate(options) {
        // Add cover page
        this.addCoverPage(options.title);
        // Parse and add content
        this.parseMarkdownContent(options.content);
        // Add footers to all pages
        this.addPageFooters();
        // Return PDF as blob
        return this.doc.output('blob');
    }
}
function generateClientPDF(options) {
    const generator = new ClientPDFGenerator();
    return generator.generate(options);
}
}),
"[project]/AI-SAAS/app/lib/clipboard.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Clipboard utility for safely copying text content to clipboard
 * with proper error handling and production-ready implementation
 */ __turbopack_context__.s([
    "copyToClipboard",
    ()=>copyToClipboard,
    "extractTextFromMarkdown",
    ()=>extractTextFromMarkdown
]);
async function copyToClipboard(text) {
    if (!text || text.trim().length === 0) {
        return {
            success: false,
            message: "Nothing to copy"
        };
    }
    try {
        // Modern browsers with Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return {
                success: true,
                message: "Copied to clipboard"
            };
        }
        // Fallback for older browsers or non-HTTPS contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
            return {
                success: true,
                message: "Copied to clipboard"
            };
        } else {
            throw new Error('Copy command failed');
        }
    } catch (error) {
        // Don't expose technical errors to users in production
        console.error('Copy to clipboard failed:', error);
        return {
            success: false,
            message: "Unable to copy right now. Please try again."
        };
    }
}
function extractTextFromMarkdown(markdownContent) {
    if (!markdownContent) return '';
    return markdownContent// Remove HTML tags if any
    .replace(/<[^>]*>/g, '')// Convert markdown headers to plain text with spacing
    .replace(/^#{1,6}\s+(.*)$/gm, '$1\n')// Convert bold/italic to plain text
    .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')// Convert lists to plain text with bullets
    .replace(/^\s*[-*+]\s+/gm, '• ').replace(/^\s*\d+\.\s+/gm, '• ')// Convert code blocks to plain text
    .replace(/```[\s\S]*?```/g, (match)=>{
        return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
    })// Convert inline code
    .replace(/`([^`]+)`/g, '$1')// Clean up excessive whitespace while preserving line breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n').trim();
}
}),
"[project]/AI-SAAS/app/chat/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/components/Sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$FeedbackForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/components/FeedbackForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/markdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$clientPdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/clientPdfGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$clipboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/clipboard.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/file.js [app-ssr] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
'use client';
;
;
;
;
;
;
;
;
;
;
function ChatContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveChat, setSaveChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true); // Save chats by default
    const [showFormatOptions, setShowFormatOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedFormat, setSelectedFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('key-points');
    const [wordCount, setWordCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(100);
    const [customWordCount, setCustomWordCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [questionCount, setQuestionCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(5);
    const [showToast, setShowToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        message: ''
    });
    const [currentConversationId, setCurrentConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCopying, setIsCopying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFeedbackModal, setShowFeedbackModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewportHeight, setViewportHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('100dvh');
    const [isKeyboardOpen, setIsKeyboardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedHistoryId, setExpandedHistoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedHistoryMessages, setExpandedHistoryMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showQuickTestDifficulty, setShowQuickTestDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quickTestDifficulty, setQuickTestDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isGeneratingQuiz, setIsGeneratingQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentQuiz, setCurrentQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userAnswers, setUserAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [quizSubmitted, setQuizSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quizResults, setQuizResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quickTestContent, setQuickTestContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasMountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Handle Mobile Keyboard and Visual Viewport
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const handleViewportChange = undefined;
    }, []);
    // Remove raw markdown bold markers that break UI (e.g. **bold**)
    const sanitizeContent = (text)=>{
        if (!text) return '';
        return text;
    };
    // 1. Handle Auth
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (!currentUser) {
                router.push('/login');
                return;
            }
            setUser(currentUser);
            setLoading(false);
        };
        checkAuth();
    }, [
        router
    ]);
    // Helper to get user-specific localStorage key
    const getStorageKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId)=>{
        return userId ? `ai_chat_draft_${userId}` : 'ai_chat_draft';
    }, []);
    // Load chat history list
    const loadChatHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch('/api/chat/history?limit=10', {
                headers: {
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                }
            });
            if (response.ok) {
                const data = await response.json();
                setChatHistory(data.conversations || []);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }, []);
    // Load conversation from API
    const loadConversation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (conversationId)=>{
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(`/api/chat/load?id=${conversationId}`, {
                headers: {
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                }
            });
            if (response.ok) {
                const data = await response.json();
                const loadedMessages = data.messages.map((msg)=>({
                        id: msg.id,
                        role: msg.role,
                        content: sanitizeContent(msg.content),
                        sources: msg.sources,
                        timestamp: new Date(msg.created_at)
                    }));
                setMessages(loadedMessages);
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }, []);
    // 2. Handle Conversation Loading (Reactive to URL)
    const conversationIdFromUrl = searchParams.get('id');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading || !user) return;
        if (conversationIdFromUrl) {
            if (conversationIdFromUrl !== currentConversationId) {
                loadConversation(conversationIdFromUrl);
                setCurrentConversationId(conversationIdFromUrl);
                setSaveChat(true);
            }
        }
    }, [
        conversationIdFromUrl,
        loading,
        user,
        currentConversationId,
        loadConversation
    ]);
    // Clear any non-user-specific draft on mount (migration cleanup)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            // Remove old global key if it exists (one-time migration)
            localStorage.removeItem('ai_chat_draft');
        } catch (e) {}
    }, []);
    // Try to restore draft immediately on mount (before auth completes). Skip if URL contains a conversation id.
    // NOTE: We can't restore here without user ID, so we'll wait for auth
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const params = new URLSearchParams(window.location.search);
        if (params.get('id')) return; // prefer server-stored conversation when present
    // Early restore skipped - will restore after auth completes with user-specific key
    }, []);
    // Persist messages and some meta to localStorage so chats survive refresh
    // Use user-specific key to prevent cross-user data leakage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Avoid writing to localStorage on the very first render — this prevents overwriting
        // an existing draft that we're about to restore.
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }
        // Don't save if no user (not authenticated yet)
        if (!user?.id) return;
        try {
            const payload = {
                messages,
                meta: {
                    currentConversationId,
                    saveChat,
                    selectedFormat,
                    wordCount
                },
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(getStorageKey(user.id), JSON.stringify(payload));
        } catch (e) {
            // Ignore storage errors (e.g. private mode)
            console.error('Failed to persist chat draft:', e);
        }
    }, [
        messages,
        currentConversationId,
        saveChat,
        selectedFormat,
        wordCount,
        user?.id,
        getStorageKey
    ]);
    // Scroll to bottom on new messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [
        messages
    ]);
    // Ensure scrolling works properly when quiz interface is shown/hidden
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentQuiz && !isGeneratingQuiz) {
            // Allow time for UI to render then scroll to quiz
            setTimeout(()=>{
                const quizElement = document.querySelector('[data-quiz-container]');
                if (quizElement) {
                    quizElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 200);
        }
    }, [
        currentQuiz,
        isGeneratingQuiz
    ]);
    // Reset scroll position when quiz is reset
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!currentQuiz && !showQuickTestDifficulty && !isGeneratingQuiz) {
            // Scroll to bottom when quiz is closed
            setTimeout(()=>{
                messagesEndRef.current?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [
        currentQuiz,
        showQuickTestDifficulty,
        isGeneratingQuiz
    ]);
    // Restore draft from localStorage after auth/checks complete — only when there's no conversation loaded
    // Use user-specific key for isolation between users
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading) return; // wait until auth/loadConversation completed
        if (!user?.id) return; // need user ID for user-specific key
        // If a conversation was explicitly loaded via URL, prefer that
        if (currentConversationId) return;
        try {
            const raw = localStorage.getItem(getStorageKey(user.id));
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
                const restored = parsed.messages.map((m)=>({
                        ...m,
                        content: sanitizeContent(m.content),
                        // restore timestamp strings back to Date objects
                        timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
                    }));
                setMessages(restored);
                if (parsed.meta) {
                    if (parsed.meta.currentConversationId) setCurrentConversationId(parsed.meta.currentConversationId);
                    if (typeof parsed.meta.saveChat === 'boolean') setSaveChat(parsed.meta.saveChat);
                    if (parsed.meta.selectedFormat) setSelectedFormat(parsed.meta.selectedFormat);
                    if (parsed.meta.wordCount) setWordCount(parsed.meta.wordCount);
                }
                // brief toast to indicate restoration
                setShowToast({
                    show: true,
                    message: 'Restored chat from previous session'
                });
                setTimeout(()=>setShowToast({
                        show: false,
                        message: ''
                    }), 2000);
            }
        } catch (e) {
            console.error('Failed to restore chat draft:', e);
        }
    }, [
        loading,
        currentConversationId,
        user?.id,
        getStorageKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        if (input.length > 0 && !showFormatOptions) {
            setShowFormatOptions(true);
        }
    }, [
        input,
        showFormatOptions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user?.id) {
            loadChatHistory();
        }
    }, [
        user?.id,
        loadChatHistory
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleChatSaved = ()=>{
            setTimeout(()=>{
                loadChatHistory();
            }, 500);
        };
        window.addEventListener('chatSaved', handleChatSaved);
        return ()=>window.removeEventListener('chatSaved', handleChatSaved);
    }, [
        loadChatHistory
    ]);
    const handleInputFocus = ()=>{
        setShowFormatOptions(true);
        // Smooth scroll to bottom on focus to ensure input is visible above keyboard
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) //TURBOPACK unreachable
        ;
    };
    const handleInputPaste = (e)=>{
        // Show options panel after paste
        const pastedText = e.clipboardData.getData('text');
        if (pastedText.length > 0) {
            setTimeout(()=>{
                setShowFormatOptions(true);
            }, 0);
        }
    };
    const showToastMessage = (message)=>{
        setShowToast({
            show: true,
            message
        });
        setTimeout(()=>setShowToast({
                show: false,
                message: ''
            }), 3000);
    };
    const isValidContent = (text)=>{
        if (!text || text.trim().length < 5) return false;
        const trimmedText = text.trim();
        // More lenient validation for structured content
        const words = trimmedText.toLowerCase().split(/\s+/).filter((w)=>w.length > 0);
        if (words.length < 1) return false;
        // Check for alphabetic content (including tables, diagrams, etc.)
        const hasAlphabeticChars = /[a-z]/i.test(trimmedText);
        // Check for excessive repeating characters (more than 10 in a row)
        const hasExcessiveRepeatingChars = /(.)\1{10,}/.test(trimmedText);
        // Check if content is mostly symbols/special chars (less than 10% alphabetic)
        const alphabeticCount = (trimmedText.match(/[a-z]/gi) || []).length;
        const totalChars = trimmedText.length;
        const alphabeticRatio = alphabeticCount / totalChars;
        // Accept content that:
        // 1. Has some alphabetic characters
        // 2. Doesn't have excessive repeating characters
        // 3. Has at least 10% alphabetic content (allows for tables, code, diagrams)
        const isValid = hasAlphabeticChars && !hasExcessiveRepeatingChars && alphabeticRatio >= 0.1;
        return isValid;
    };
    const showAboutMessage = ()=>{
        const aboutMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `#  Welcome to QuickNotes!

## What is QuickNotes?
QuickNotes is your personal study assistant that transforms any content into organized, formatted study notes in seconds.

## How to Use:

### Step 1: Paste Your Content
- Copy and paste your lecture notes, articles, research papers, or any study material into the text field below
- You can paste from websites, PDFs, books, or any text source

### Step 2: Choose Your Format
- **Key Points**: Essential information organized by topic
- **Main Concepts**: Detailed explanations of core concepts
- **Exam Points**: Content formatted for exam preparation
- **Short Notes**: Concise, scannable notes
- **Speech Notes**: Content organized for verbal presentation
- **Presentation Notes**: Formatted for slide/presentation structure
- **Summary**: Comprehensive overview of all main points

### Step 3: Set Word Count
- Choose from 50, 100, or 200 words
- Or enter a custom word count
- Longer content = more detailed notes

### Step 4: Export
- Click **Export PDF** to download professional PDF document
- Click **Export DOC** to download as Word document
- Or copy the generated text directly

## Tips:
 Paste full paragraphs or entire documents
 Longer content produces better formatted notes
 Experiment with different formats
Adjust word count based on your needs
All your notes are automatically saved

---

**Ready to get started?** Paste your study material in the text field below!`,
            timestamp: new Date()
        };
        setMessages([
            aboutMessage
        ]);
    };
    const generateFormatPrompt = (format, wordCount, userInput)=>{
        const formatPrompts = {
            'key-points': `Extract and organize KEY POINTS from the following content. 

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Focus ONLY on the most important information
- Use clear headings (##) to organize sections
- Use bullet points (-) for key points
- Use **bold** for important terms
- Keep paragraphs short (max 2-3 sentences)
- Limit to EXACTLY ${wordCount} words
- Structure: Main Topic → Key Points → Important Details
- Make it exam-friendly and readable

Content to process:
${userInput}`,
            'main-concepts': `Identify and explain the MAIN CONCEPTS from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for lists)
- Provide clear definitions and explanations
- Use headings (##) for each main concept
- Use bullet points for supporting details
- Use **bold** for key terms and definitions
- Keep it structured and organized
- Limit to EXACTLY ${wordCount} words
- Make content clear and exam-friendly

Content to process:
${userInput}`,
            'exam-points': `Create EXAM-FOCUSED NOTES from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Highlight information likely to appear in exams
- Include definitions, formulas, dates, names, and key facts
- Use headings (##) to organize by topic
- Use bullet points for key facts
- Use **bold** for important terms
- Keep paragraphs very short
- Limit to EXACTLY ${wordCount} words
- Structure for quick review and memorization

Content to process:
${userInput}`,
            'short-notes': `Create SHORT NOTES from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Keep it concise and organized
- Use clear headings (##) for sections
- Use bullet points for key information
- Focus on essential information only
- Limit to EXACTLY ${wordCount} words
- Make it easy to scan and review

Content to process:
${userInput}`,
            'speech-notes': `Create SPEECH NOTES from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Structure for verbal presentation
- Use headings (##) for main sections
- Use bullet points for talking points
- Keep it conversational and easy to follow
- Use **bold** for emphasis points
- Limit to EXACTLY ${wordCount} words
- Make it suitable for speaking

Content to process:
${userInput}`,
            'presentation-notes': `Create PRESENTATION NOTES from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Structure for slides/presentation format
- Use headings (##) for each slide/topic
- Use bullet points for key takeaways
- Keep each section concise
- Use **bold** for emphasis
- Limit to EXACTLY ${wordCount} words
- Make it presentation-ready

Content to process:
${userInput}`,
            'summary': `Create a comprehensive SUMMARY from the following content.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Cover all main points
- Use headings (##) to organize by topic
- Use bullet points for key information
- Use **bold** for important terms
- Keep it structured and comprehensive
- Limit to EXACTLY ${wordCount} words
- Make it complete but concise

Content to process:
${userInput}`,
            'mcqs': `Generate Multiple Choice Questions (MCQs) strictly based on the provided study material.

REQUIREMENTS:
- Do NOT introduce information outside the given content
- Questions must be exam-oriented and concept-focused
- Difficulty level: Medium (college / university exams)
- Avoid ambiguous or opinion-based questions
- Each question must have exactly 4 options (A–D)
- Use clean, vertical layout
- Clearly mark the correct answer
- Provide a brief explanation

FORMAT:
## Multiple Choice Questions (MCQs)

Q1. Question text here?
A. Option A
B. Option B
C. Option C
D. Option D

Correct Answer: A
Explanation: Brief explanation of why this is correct.

---

Q2. Next question?
A. Option A
B. Option B
C. Option C
D. Option D

Correct Answer: B
Explanation: Brief explanation here.

TABLE FORMATTING (if needed):
Use this exact format for tables:
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data | Data | Data |
| Data | Data | Data |

DO NOT USE:
- Extra pipes outside table boundaries
- Colons or special alignment characters
- Unequal spacing between rows
- Messy alignment marks like "| :--- |"

Constraints:
- Generate exactly ${wordCount} MCQs
- Do not repeat questions
- Keep explanations concise
- Use Q1, Q2, Q3... numbering
- Use A. B. C. D. format for options
- No messy characters or extra formatting

Content to process:
${userInput}`,
            'quick-test': `Quick Test mode - handled separately`
        };
        return formatPrompts[format];
    };
    const handleSend = async ()=>{
        if (!input.trim() || isLoading) {
            console.log('handleSend blocked:', {
                inputEmpty: !input.trim(),
                isLoading
            });
            return;
        }
        const userInput = input.trim();
        console.log('handleSend called with input:', userInput.substring(0, 50));
        if (!isValidContent(userInput)) {
            console.log('Content validation failed, showing about message');
            setInput('');
            setShowFormatOptions(false);
            showAboutMessage();
            return;
        }
        console.log('Content validation passed');
        let processedInput = userInput;
        // Handle Quick Test selection
        if (showFormatOptions && selectedFormat === 'quick-test') {
            // Check if we have content to work with
            if (!userInput.trim() || userInput.trim().length < 120) {
                showToastMessage('Please paste content first, then select Quick Test.');
                return;
            }
            // Store the content for Quick Test before clearing input
            setQuickTestContent(userInput.trim());
            setShowQuickTestDifficulty(true);
            setInput('');
            setShowFormatOptions(false);
            setIsLoading(false);
            return;
        }
        // Apply format if format options are shown and user wants formatted output
        if (showFormatOptions && selectedFormat) {
            const countToUse = selectedFormat === 'mcqs' ? questionCount : wordCount;
            processedInput = generateFormatPrompt(selectedFormat, countToUse, userInput);
        }
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: userInput,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInput('');
        setShowFormatOptions(false);
        setIsLoading(true);
        try {
            console.log('🚀 Starting handleSend...');
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
            console.log('Auth check:', {
                hasUser: !!currentUser,
                error: userError?.message
            });
            if (userError || !currentUser) {
                console.error('Auth error:', userError);
                throw new Error('Please log in to use the chat feature');
            }
            console.log('✅ User authenticated:', currentUser.id);
            // Save user message immediately if saveChat is ON
            // Store the returned conversation ID to use for assistant message
            let savedConversationId = null;
            if (saveChat && currentUser) {
                try {
                    console.log('💾 Saving user message...');
                    savedConversationId = await saveMessageToDatabase(userMessage, currentUser.id);
                    console.log('✅ User message saved, conversationId:', savedConversationId);
                } catch (saveError) {
                    console.error('Error saving user message:', saveError);
                // Continue with chat even if save fails
                }
            }
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Session token exists:', !!session?.access_token);
            console.log('📡 Calling /api/chat with input:', processedInput.substring(0, 50));
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                },
                body: JSON.stringify({
                    question: processedInput,
                    userId: currentUser.id
                })
            });
            console.log('📥 API Response:', response.status, response.statusText);
            if (!response.ok) {
                const errorData = await response.text();
                console.error('❌ API error:', response.status, errorData);
                let errorMessage = `API error (${response.status})`;
                try {
                    const errorJson = JSON.parse(errorData);
                    errorMessage = errorJson.error || errorMessage;
                } catch  {
                    errorMessage = errorData.substring(0, 200) || errorMessage;
                }
                throw new Error(errorMessage);
            }
            console.log('✅ API response OK, starting to stream...');
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            const messageId = (Date.now() + 1).toString();
            let assistantContent = '';
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: messageId,
                        role: 'assistant',
                        content: assistantContent,
                        timestamp: new Date()
                    }
                ]);
            if (reader) {
                console.log('🔄 Starting to read stream...');
                let streamEnded = false;
                let chunkCount = 0;
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('✅ Stream ended. Total chunks:', chunkCount, 'Content length:', assistantContent.length);
                        if (!assistantContent) {
                            assistantContent = 'No response received from the AI. Please check your API key and try again.';
                            setMessages((prev)=>{
                                const updated = [
                                    ...prev
                                ];
                                updated[updated.length - 1] = {
                                    id: messageId,
                                    role: 'assistant',
                                    content: assistantContent,
                                    timestamp: new Date()
                                };
                                return updated;
                            });
                        } else {
                            // Save assistant message if toggle is ON
                            // Pass the conversation ID from when we saved the user message
                            if (saveChat && currentUser) {
                                try {
                                    await saveMessageToDatabase({
                                        id: messageId,
                                        role: 'assistant',
                                        content: assistantContent,
                                        timestamp: new Date()
                                    }, currentUser.id, savedConversationId);
                                } catch (saveError) {
                                    console.error('Error saving assistant message:', saveError);
                                    showToastMessage('Chat saved, but failed to save last message. Please try again.');
                                }
                            }
                        }
                        break;
                    }
                    chunkCount++;
                    const chunk = decoder.decode(value);
                    console.log(`📦 Chunk ${chunkCount}:`, chunk.substring(0, 100));
                    const lines = chunk.split('\n');
                    for (const line of lines){
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') continue;
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.error) {
                                    console.error('❌ API Error in stream:', parsed.error);
                                    assistantContent = `Error: ${parsed.error}`;
                                    setMessages((prev)=>{
                                        const updated = [
                                            ...prev
                                        ];
                                        updated[updated.length - 1] = {
                                            id: messageId,
                                            role: 'assistant',
                                            content: assistantContent,
                                            timestamp: new Date()
                                        };
                                        return updated;
                                    });
                                    streamEnded = true;
                                    break;
                                }
                                if (parsed.content) {
                                    assistantContent += sanitizeContent(parsed.content);
                                    setMessages((prev)=>{
                                        const updated = [
                                            ...prev
                                        ];
                                        updated[updated.length - 1] = {
                                            id: messageId,
                                            role: 'assistant',
                                            content: assistantContent,
                                            timestamp: new Date()
                                        };
                                        return updated;
                                    });
                                }
                                if (parsed.sources) {
                                    setMessages((prev)=>{
                                        const updated = [
                                            ...prev
                                        ];
                                        updated[updated.length - 1] = {
                                            id: messageId,
                                            role: 'assistant',
                                            content: assistantContent,
                                            sources: parsed.sources,
                                            timestamp: new Date()
                                        };
                                        return updated;
                                    });
                                }
                            } catch (parseErr) {
                                console.warn('Failed to parse JSON:', data.substring(0, 50), parseErr);
                            }
                        }
                    }
                    if (streamEnded) break;
                }
            }
        } catch (error) {
            console.error('❌ Chat error:', error);
            const errorDetails = error instanceof Error ? error.message : 'Unknown error occurred';
            const errorMessage = {
                id: (Date.now() + 2).toString(),
                role: 'assistant',
                content: `Error: ${errorDetails}\n\nPlease check:\n1. Your Google Gemini API key is set in .env.local\n2. The API key is valid\n3. Your internet connection is working\n\nTry refreshing the page and asking again.`,
                timestamp: new Date()
            };
            setMessages((prev)=>[
                    ...prev,
                    errorMessage
                ]);
            showToastMessage(`Error: ${errorDetails}`);
        } finally{
            console.log('🏁 handleSend finished, setting isLoading to false');
            setIsLoading(false);
        }
    };
    // Save a single message to database (creates conversation if needed)
    // Returns the conversation ID (new or existing)
    const saveMessageToDatabase = async (message, userId, existingConvId)=>{
        if (!saveChat) {
            return existingConvId || currentConversationId; // Don't save if checkbox is OFF
        }
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            // Use passed conversation ID or fall back to state
            let conversationId = existingConvId || currentConversationId;
            // Helper to extract useful error info from a non-OK response
            const extractError = async (res)=>{
                let body = null;
                try {
                    const text = await res.text();
                    try {
                        body = JSON.parse(text);
                    } catch  {
                        body = text;
                    }
                } catch (e) {
                    body = null;
                }
                return {
                    status: res.status,
                    body
                };
            };
            // Create conversation if it doesn't exist
            if (!conversationId) {
                // Generate title from first user message
                const firstUserMessage = messages.find((m)=>m.role === 'user') || message;
                const title = firstUserMessage.content.substring(0, 50) || 'Chat Conversation';
                const createResponse = await fetch('/api/chat/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...session?.access_token && {
                            'Authorization': `Bearer ${session.access_token}`
                        }
                    },
                    body: JSON.stringify({
                        title: title,
                        messages: [
                            message
                        ].map((m)=>({
                                role: m.role,
                                content: m.content,
                                sources: m.sources
                            })),
                        conversationId: null
                    })
                });
                if (createResponse.ok) {
                    const data = await createResponse.json();
                    conversationId = data.id;
                    setCurrentConversationId(conversationId);
                    console.log('Conversation created:', conversationId);
                    // Clear the local draft now that conversation is persisted
                    try {
                        localStorage.removeItem(getStorageKey(user?.id));
                    } catch (e) {}
                    // Ensure URL stays at /chat without id to keep user on same page
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    // Dispatch event to refresh sidebar with a small delay
                    setTimeout(()=>{
                        window.dispatchEvent(new CustomEvent('chatSaved'));
                    }, 300);
                } else {
                    // Improve logging: include status and body (JSON or text)
                    const info = await extractError(createResponse);
                    console.error('Create conversation failed:', info);
                    let errorMessage = `Failed to create conversation (status ${info.status})`;
                    if (info.body) {
                        if (typeof info.body === 'object') {
                            errorMessage = info.body.error || info.body.details || JSON.stringify(info.body) || errorMessage;
                        } else if (typeof info.body === 'string' && info.body.trim()) {
                            errorMessage = info.body;
                        }
                    }
                    throw new Error(errorMessage);
                }
            } else {
                // Update existing conversation - add new message
                const updateResponse = await fetch('/api/chat/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...session?.access_token && {
                            'Authorization': `Bearer ${session.access_token}`
                        }
                    },
                    body: JSON.stringify({
                        title: '',
                        messages: [
                            message
                        ].map((m)=>({
                                role: m.role,
                                content: m.content,
                                sources: m.sources
                            })),
                        conversationId: conversationId
                    })
                });
                if (!updateResponse.ok) {
                    const info = await extractError(updateResponse);
                    console.error('Update conversation failed:', info);
                    let errorMessage = `Failed to save message (status ${info.status})`;
                    if (info.body) {
                        if (typeof info.body === 'object') {
                            errorMessage = info.body.error || info.body.details || JSON.stringify(info.body) || errorMessage;
                        } else if (typeof info.body === 'string' && info.body.trim()) {
                            errorMessage = info.body;
                        }
                    }
                    throw new Error(errorMessage);
                }
                console.log('Message saved to conversation:', conversationId);
                // Clear the local draft now that message is persisted
                try {
                    localStorage.removeItem(getStorageKey(user?.id));
                } catch (e) {}
                // Dispatch event to refresh sidebar with a small delay
                setTimeout(()=>{
                    window.dispatchEvent(new CustomEvent('chatSaved'));
                }, 300);
            }
            return conversationId;
        } catch (error) {
            // Only log if it's a real error with content
            if (error instanceof Error) {
                console.error('Error saving message to database:', error.message);
            } else if (error && typeof error === 'object') {
                const errorKeys = Object.keys(error);
                if (errorKeys.length > 0 || error.message || error.stack) {
                    console.error('Error saving message to database:', error);
                }
            }
            // Don't show toast for save errors to avoid spam - just log
            throw error; // Re-throw to let caller handle
        }
        return null; // Fallback return
    };
    const handleViewPreviousChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (conversationId)=>{
        if (expandedHistoryId === conversationId) {
            setExpandedHistoryId(null);
            setExpandedHistoryMessages([]);
        } else {
            setExpandedHistoryId(conversationId);
            try {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                const { data: { session } } = await supabase.auth.getSession();
                const response = await fetch(`/api/chat/load?id=${conversationId}`, {
                    headers: {
                        ...session?.access_token && {
                            'Authorization': `Bearer ${session.access_token}`
                        }
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const loadedMessages = data.messages.map((msg)=>({
                            id: msg.id,
                            role: msg.role,
                            content: sanitizeContent(msg.content),
                            sources: msg.sources,
                            timestamp: new Date(msg.created_at)
                        }));
                    setExpandedHistoryMessages(loadedMessages);
                }
            } catch (error) {
                console.error('Error loading conversation:', error);
            }
        }
    }, [
        expandedHistoryId
    ]);
    const downloadFile = (blob, filename)=>{
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.download = filename;
                document.body.appendChild(link);
                link.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));
                setTimeout(()=>{
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 100);
            } else {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Download error:', error);
            throw error;
        }
    };
    const handleExport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (type, messageContent)=>{
        if (!user || !messageContent) {
            showToastMessage('Cannot export: No content available');
            return;
        }
        if (isExporting) return;
        setIsExporting(true);
        try {
            const firstUserMessage = messages.find((m)=>m.role === 'user');
            const title = firstUserMessage?.content.substring(0, 50) || 'Study Notes';
            const cleanTitle = title.replace(/[^a-z0-9]/gi, '_');
            if (type === 'pdf') {
                showToastMessage('Generating PDF...');
                try {
                    // Try server-side generation first
                    const response = await fetch('/api/chat/pdf', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            markdown: messageContent,
                            title: title,
                            filename: `${cleanTitle}.pdf`
                        })
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        if (blob.size > 0) {
                            downloadFile(blob, `${cleanTitle}.pdf`);
                            showToastMessage('PDF downloaded successfully!');
                            return;
                        }
                    }
                    throw new Error('Server-side PDF generation failed');
                } catch (serverError) {
                    console.warn('Server-side PDF failed, using client-side generation:', serverError);
                    showToastMessage('Generating PDF with backup method...');
                    try {
                        // Use client-side jsPDF as fallback
                        const pdfBlob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$clientPdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateClientPDF"])({
                            title: title,
                            content: messageContent,
                            author: 'QuickNotes',
                            subject: 'Study Notes'
                        });
                        downloadFile(pdfBlob, `${cleanTitle}.pdf`);
                        showToastMessage('PDF generated successfully!');
                    } catch (clientError) {
                        console.error('Client-side PDF generation failed:', clientError);
                        showToastMessage('Trying text file export...');
                        try {
                            const textBlob = new Blob([
                                messageContent
                            ], {
                                type: 'text/plain; charset=utf-8'
                            });
                            downloadFile(textBlob, `${cleanTitle}.txt`);
                            showToastMessage('Downloaded as text file');
                        } catch (fallbackError) {
                            console.error('All export methods failed:', fallbackError);
                            showToastMessage('Could not export. Please copy text manually.');
                        }
                    }
                }
            } else if (type === 'doc') {
                try {
                    const cleanContent = messageContent.replace(/[*#\[\]]/g, '');
                    const blob = new Blob([
                        cleanContent
                    ], {
                        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    });
                    downloadFile(blob, `${cleanTitle}.docx`);
                    showToastMessage('Document downloaded successfully');
                } catch (docError) {
                    console.error('DOC export error:', docError);
                    showToastMessage('Could not export as document. Please try PDF instead.');
                }
            }
            try {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                const { data: { session } } = await supabase.auth.getSession();
                await fetch('/api/chat/export', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...session?.access_token && {
                            'Authorization': `Bearer ${session.access_token}`
                        }
                    },
                    body: JSON.stringify({
                        title: title,
                        content: messageContent,
                        type: type,
                        conversationId: currentConversationId
                    })
                });
            } catch (apiError) {
                console.error('Export API error:', apiError);
            }
        } catch (error) {
            console.error('Export error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Export failed';
            showToastMessage(errorMsg);
        } finally{
            setIsExporting(false);
        }
    }, [
        user,
        messages,
        currentConversationId,
        isExporting
    ]);
    const handleCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (messageContent)=>{
        if (!messageContent || messageContent.trim().length === 0) {
            showToastMessage('Nothing to copy');
            return;
        }
        if (isCopying) return;
        setIsCopying(true);
        try {
            // Extract plain text from markdown while preserving structure
            const plainText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$clipboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractTextFromMarkdown"])(messageContent);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$clipboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyToClipboard"])(plainText);
            showToastMessage(result.message);
        } catch (error) {
            console.error('Copy error:', error);
            showToastMessage('Unable to copy right now. Please try again.');
        } finally{
            setIsCopying(false);
        }
    }, [
        isCopying
    ]);
    const handleQuickTestDifficulty = async (difficulty)=>{
        try {
            console.log('🎯 Quick Test Started - Difficulty:', difficulty);
            setQuickTestDifficulty(difficulty);
            setShowQuickTestDifficulty(false);
            setIsGeneratingQuiz(true);
            setCurrentQuiz(null);
            setUserAnswers({});
            setQuizSubmitted(false);
            setQuizResults(null);
            // Check if we have stored content for Quick Test
            const hasQuickTestContent = quickTestContent && quickTestContent.length >= 120;
            console.log('Content check for Quick Test:', {
                hasQuickTestContent,
                contentLength: quickTestContent?.length || 0
            });
            if (!hasQuickTestContent) {
                console.log('❌ Quick Test requires stored content');
                showToastMessage('Please paste content in the text field first, then select Quick Test.');
                setIsGeneratingQuiz(false);
                setShowQuickTestDifficulty(true);
                return;
            }
            // Get the primary study material for the quiz
            let primaryContent = '';
            let contentSource = '';
            // Use the stored Quick Test content
            primaryContent = quickTestContent;
            contentSource = 'quick_test_content';
            console.log('✅ Using stored Quick Test content as source:', primaryContent.length, 'chars');
            // Define message filters for debugging
            const userMessages = messages.filter((m)=>m.role === 'user');
            const assistantMessages = messages.filter((m)=>m.role === 'assistant');
            // Content sufficiency check - require minimum 120 characters
            if (!primaryContent || primaryContent.length < 120) {
                console.error('❌ Content validation failed!');
                console.error('Primary content:', primaryContent ? `"${primaryContent.substring(0, 100)}..."` : 'null');
                console.error('Content length:', primaryContent?.length || 0);
                console.error('Content source:', contentSource || 'none');
                console.error('User messages count:', userMessages.length);
                console.error('Assistant messages count:', assistantMessages.length);
                console.error('Total messages:', messages.length);
                console.log('🔍 Debug: All user messages:');
                userMessages.forEach((msg, i)=>{
                    console.log(`  User msg ${i}:`, {
                        length: msg.content?.length || 0,
                        preview: msg.content?.substring(0, 50) || 'empty',
                        wordCount: msg.content ? msg.content.split(/\s+/).length : 0
                    });
                });
                // Show user-friendly error based on situation
                if (messages.length === 0 || primaryContent.length < 120) {
                    showToastMessage('Not enough content to generate a quiz. Please add more information.');
                } else {
                    showToastMessage('Not enough content to generate a quiz. Please add more information.');
                }
                setIsGeneratingQuiz(false);
                setShowQuickTestDifficulty(true);
                return;
            }
            console.log('✅ Content validation passed! Content length:', primaryContent.length);
            // Additional content validation for quiz suitability
            const wordCount = primaryContent.split(/\s+/).length;
            if (wordCount < 3) {
                console.error('Word count too low:', wordCount, 'words in:', primaryContent);
                showToastMessage('Content is too short for quiz generation. Please provide more detailed material.');
                setIsGeneratingQuiz(false);
                setShowQuickTestDifficulty(true);
                return;
            }
            // Use only the primary content - no mixing to avoid confusion
            const context = primaryContent;
            console.log('Quiz Generation Info:');
            console.log('- Content Source:', contentSource);
            console.log('- Content Preview:', context.substring(0, 300) + '...');
            console.log('- Content Stats:', context.length, 'characters,', wordCount, 'words');
            // Generate quiz prompt based on difficulty
            const numQuestions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
            const difficultyLevel = difficulty === 'easy' ? 'basic' : difficulty === 'medium' ? 'intermediate' : 'advanced';
            const quizPrompt = `CRITICAL INSTRUCTION: Use ONLY the content below to generate questions. If a concept is not mentioned, it must NOT appear. If the content is insufficient, do NOT guess.

STUDY MATERIAL:
"""
${context}
"""

TASK: Create exactly ${numQuestions} ${difficultyLevel} level multiple choice questions using EXCLUSIVELY the content above.

STRICT CONTENT RULES:
- Every question MUST be answerable using ONLY the given content
- Use the exact terminology from the provided text
- If information is not stated, do NOT include it
- Each question must map to a specific sentence or paragraph

DIFFICULTY GUIDELINES:
${difficultyLevel === 'basic' ? '- Ask about direct facts or definitions explicitly stated' : difficultyLevel === 'intermediate' ? '- Ask about comparisons or explanations stated in the content' : '- Ask about logical inferences ONLY if the information exists in the content'}

VALIDATION CHECK:
Before including any question, ask: "Can this be answered using only the pasted content?"
If NO, discard and regenerate.

OUTPUT FORMAT (JSON only):
{
  "questions": [
    {
      "question": "[Question based on provided text]",
      "options": ["[Correct answer from text]", "[Wrong option]", "[Wrong option]", "[Wrong option]"],
      "correct": 0
    }
  ]
}

Generate exactly ${numQuestions} questions. Return only valid JSON.`;
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...session?.access_token && {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                },
                body: JSON.stringify({
                    question: quizPrompt
                })
            });
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.json();
            if (!data || !data.content) {
                throw new Error('Invalid response from server');
            }
            let quizData;
            try {
                // Clean the content and try to parse directly
                let cleanContent = data.content.trim();
                // Remove common streaming prefixes that might interfere
                if (cleanContent.startsWith('data: ')) {
                    cleanContent = cleanContent.substring(6);
                }
                // Remove any leading/trailing whitespace and newlines
                cleanContent = cleanContent.replace(/^\s*[\r\n]+|[\r\n]+\s*$/g, '');
                // Try to parse the cleaned content
                quizData = JSON.parse(cleanContent);
            } catch (firstError) {
                console.warn('Direct JSON parsing failed:', firstError);
                try {
                    // If direct parsing fails, try to extract JSON from the response
                    let content = data.content;
                    // Handle streaming format like "data: {...}"
                    if (content.includes('data: {')) {
                        const dataMatch = content.match(/data:\s*(\{[\s\S]*?\})/);
                        if (dataMatch) {
                            content = dataMatch[1];
                        }
                    }
                    // Extract the largest JSON object
                    const jsonMatches = content.match(/\{[\s\S]*\}/g);
                    if (jsonMatches) {
                        // Try parsing each match, starting with the longest
                        const sortedMatches = jsonMatches.sort((a, b)=>b.length - a.length);
                        for (const match of sortedMatches){
                            try {
                                const cleanMatch = match.trim();
                                quizData = JSON.parse(cleanMatch);
                                // Validate that this is actually quiz data
                                if (quizData && quizData.questions && Array.isArray(quizData.questions)) {
                                    break;
                                }
                            } catch  {
                                continue;
                            }
                        }
                        if (!quizData) {
                            throw new Error('Could not parse any valid quiz JSON');
                        }
                    } else {
                        throw new Error('No JSON structure found in response');
                    }
                } catch (secondError) {
                    console.error('All JSON parsing attempts failed:', {
                        firstError,
                        secondError,
                        rawContent: data.content.substring(0, 200) + '...'
                    });
                    throw new Error('Could not parse quiz data from API response');
                }
            }
            if (!quizData || !quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
                throw new Error('Invalid quiz format received');
            }
            // Validate quiz quality and content relevance
            const validQuestions = quizData.questions.filter((q)=>{
                // Basic structure validation
                if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
                    console.warn('Filtering out malformed question:', q.question);
                    return false;
                }
                // Content quality validation
                if (q.question.length < 15 || !q.options.every((opt)=>opt && opt.length > 2)) {
                    console.warn('Filtering out low quality question:', q.question);
                    return false;
                }
                // Enhanced content relevance check
                const questionLower = q.question.toLowerCase();
                const contextLower = context.toLowerCase();
                // Check for generic question patterns
                const genericPatterns = [
                    'which of the following is true',
                    'what is the capital',
                    'what is commonly known',
                    'general knowledge',
                    'which statement is correct',
                    'what do you know about',
                    'in general,',
                    'typically,',
                    'usually,'
                ];
                const isGeneric = genericPatterns.some((pattern)=>questionLower.includes(pattern));
                if (isGeneric) {
                    console.warn('Filtering out generic question pattern:', q.question);
                    return false;
                }
                // Content relevance validation - check if question relates to the source material
                const questionWords = q.question.toLowerCase().split(/\W+/).filter((word)=>word.length > 3);
                const contextWords = new Set(contextLower.split(/\W+/).filter((word)=>word.length > 3));
                // Calculate relevance score based on shared content words
                const relevantWords = questionWords.filter((word)=>contextWords.has(word));
                const relevanceScore = relevantWords.length / Math.max(questionWords.length, 1);
                if (relevanceScore < 0.3) {
                    console.warn('Filtering out low relevance question (score:', relevanceScore.toFixed(2), '):', q.question);
                    return false;
                }
                // Check if the correct answer contains content-specific terms
                const correctAnswer = q.options[q.correct];
                if (correctAnswer && correctAnswer.length > 3) {
                    const answerWords = correctAnswer.toLowerCase().split(/\W+/).filter((word)=>word.length > 3);
                    const answerRelevance = answerWords.filter((word)=>contextWords.has(word)).length > 0;
                    if (!answerRelevance) {
                        console.warn('Filtering out question with non-content answer:', q.question, '→', correctAnswer);
                        return false;
                    }
                }
                // Additional validation: Check if answer can be found in content
                const answerInContent = contextLower.includes(correctAnswer.toLowerCase()) || contextLower.includes(correctAnswer.toLowerCase().replace(/[^\w\s]/g, ''));
                if (!answerInContent && relevanceScore < 0.4) {
                    console.warn('Filtering out question - answer not traceable to content:', q.question);
                    return false;
                }
                return true;
            });
            if (validQuestions.length === 0) {
                throw new Error('Unable to generate content-relevant questions. Please provide more specific study material.');
            }
            // Ensure we have enough questions for the requested difficulty
            if (validQuestions.length < Math.min(3, numQuestions)) {
                throw new Error('Not enough content-relevant questions could be generated. Try providing more detailed material.');
            }
            // Use only valid questions
            const finalQuiz = {
                ...quizData,
                questions: validQuestions
            };
            console.log('Generated Quiz Questions:');
            validQuestions.forEach((q, index)=>{
                console.log(`Q${index + 1}: ${q.question}`);
                console.log(`Correct Answer: ${q.options[q.correct]}`);
            });
            setCurrentQuiz(finalQuiz);
        } catch (error) {
            console.error('Quiz generation error:', error);
            // Reset UI state and show user-friendly message
            setIsGeneratingQuiz(false);
            setShowQuickTestDifficulty(true);
            // Provide specific error feedback based on the error type
            let errorMessage = 'Unable to generate quiz. Please try again.';
            const errorStr = error instanceof Error ? error.message : String(error);
            if (errorStr.includes('Not enough content') || errorStr.includes('Insufficient content')) {
                errorMessage = 'Not enough content to generate a quiz. Please add more information.';
            } else if (errorStr.includes('Content too short')) {
                errorMessage = 'Content too short for meaningful quiz questions. Please provide more detailed material.';
            } else if (errorStr.includes('content-relevant questions')) {
                errorMessage = 'Unable to create relevant questions from this content. Try providing more specific study material.';
            } else if (errorStr.includes('quality standards')) {
                errorMessage = 'Content quality insufficient for quiz generation. Please provide clearer study material.';
            } else if (errorStr.includes('parse quiz data') || errorStr.includes('JSON')) {
                errorMessage = 'Unable to process quiz response. Please try again.';
            } else {
                // Check if we have any content at all
                const userMessages = messages.filter((m)=>m.role === 'user');
                const hasAnyContent = userMessages.some((m)=>m.content && m.content.trim().length > 20);
                errorMessage = hasAnyContent ? 'Unable to generate quiz from the provided content. Please try again with different material.' : 'Please provide study material to generate relevant quiz questions.';
            }
            showToastMessage(errorMessage);
        } finally{
            setIsGeneratingQuiz(false);
        }
    };
    const handleQuizAnswer = (questionIndex, optionIndex)=>{
        if (quizSubmitted) return;
        setUserAnswers((prev)=>({
                ...prev,
                [questionIndex]: optionIndex
            }));
    };
    const handleQuizSubmit = ()=>{
        if (!currentQuiz || quizSubmitted) return;
        let correct = 0;
        const total = currentQuiz.questions.length;
        currentQuiz.questions.forEach((question, index)=>{
            if (userAnswers[index] === question.correct) {
                correct++;
            }
        });
        const percentage = Math.round(correct / total * 100);
        let feedback = '';
        if (percentage >= 80) {
            feedback = 'Excellent work! You have a strong understanding of the material.';
        } else if (percentage >= 60) {
            feedback = 'Good job! You\'re on the right track. Review the areas you missed.';
        } else if (percentage >= 40) {
            feedback = 'Not bad, but there\'s room for improvement. Study the material again.';
        } else {
            feedback = 'Keep studying! Focus on understanding the key concepts better.';
        }
        setQuizResults({
            score: correct,
            total,
            feedback
        });
        setQuizSubmitted(true);
    };
    const resetQuickTest = ()=>{
        setShowQuickTestDifficulty(false);
        setQuickTestDifficulty(null);
        setCurrentQuiz(null);
        setUserAnswers({});
        setQuizSubmitted(false);
        setQuizResults(null);
        setIsGeneratingQuiz(false);
        setQuickTestContent('');
    };
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    // Shift+Enter for newline (default behavior)
    };
    const formatOptions = [
        {
            value: 'key-points',
            label: 'Key Points'
        },
        {
            value: 'main-concepts',
            label: 'Main Concepts'
        },
        {
            value: 'exam-points',
            label: 'Exam Points'
        },
        {
            value: 'short-notes',
            label: 'Short Notes'
        },
        {
            value: 'speech-notes',
            label: 'Speech Notes'
        },
        {
            value: 'presentation-notes',
            label: 'Presentation Notes'
        },
        {
            value: 'summary',
            label: 'Summary'
        },
        {
            value: 'mcqs',
            label: 'MCQs'
        },
        {
            value: 'quick-test',
            label: 'Quick Test'
        }
    ];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-[100dvh] flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-8 h-8 animate-spin text-blue-600"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                lineNumber: 1635,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
            lineNumber: 1634,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex bg-gray-50 overflow-hidden fixed inset-0 w-screen h-screen",
        style: {
            height: viewportHeight
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                user: user
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                lineNumber: 1642,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden relative w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg sm:text-2xl font-bold text-gray-900 truncate",
                                            children: "AI Assistant"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1649,
                                            columnNumber: 15
                                        }, this),
                                        messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMessages([]);
                                                setInput('');
                                                setCurrentConversationId(null);
                                                setShowFormatOptions(false);
                                            },
                                            className: "px-2 py-1 text-xs sm:text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded transition-colors font-medium whitespace-nowrap hidden sm:inline-block",
                                            title: "Start a new chat",
                                            children: "+ New Chat"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1651,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1648,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 sm:gap-3 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative hidden lg:block",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 1667,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Search...",
                                                    className: "pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 1668,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1666,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFeedbackModal(true),
                                            className: "p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-colors touch-target",
                                            title: "Send feedback",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1679,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1674,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-colors touch-target",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1682,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1681,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1665,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 1647,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 1646,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-y-auto bg-white scroll-smooth",
                        ref: scrollAreaRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pb-24 sm:pb-28",
                            children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full py-8 sm:py-12 bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1695,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1694,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3",
                                            children: "Welcome to QuickNotes! 📚"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1697,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-xs sm:text-sm max-w-sm mx-auto mb-3 sm:mb-4",
                                            children: "Paste your study content into the text field below, then select your desired output format."
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1698,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 max-w-sm mx-auto text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-semibold text-blue-900 mb-2 text-left",
                                                    children: "✨ How to use:"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 1702,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "text-xs text-blue-800 space-y-1 text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-left",
                                                            children: "📋 Paste your content in the chat below"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1704,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-left",
                                                            children: "🎯 Select format: Key Points, Summary, Exam Notes, etc."
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1705,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-left",
                                                            children: "📊 Set word count for your output"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1706,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-left",
                                                            children: "💾 Export as PDF or download"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1707,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 1703,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1701,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1693,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                lineNumber: 1692,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    messages.map((message, index)=>{
                                        const lastAssistantIndex = messages.map((m, i)=>({
                                                role: m.role,
                                                index: i
                                            })).filter(({ role })=>role === 'assistant').pop()?.index ?? -1;
                                        const isLastAssistantMessage = message.role === 'assistant' && index === lastAssistantIndex;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-full py-3 sm:py-4 ${message.role === 'user' ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 last:border-b-0`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-w-4xl mx-auto px-3 sm:px-4 lg:px-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-3 sm:gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`,
                                                            children: message.role === 'user' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium",
                                                                children: user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                lineNumber: 1732,
                                                                columnNumber: 31
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs",
                                                                children: "AI"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                lineNumber: 1736,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1726,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-900 leading-relaxed",
                                                                    children: message.role === 'assistant' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderMarkdown"])(message.content) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "whitespace-pre-wrap text-left",
                                                                        children: message.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                        lineNumber: 1742,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                    lineNumber: 1740,
                                                                    columnNumber: 29
                                                                }, this),
                                                                message.sources && message.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 pt-3 border-t border-gray-200",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600",
                                                                            children: "Sources"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                            lineNumber: 1749,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-wrap gap-2",
                                                                            children: message.sources.map((source, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-700",
                                                                                    children: [
                                                                                        source.name,
                                                                                        source.page && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-gray-500",
                                                                                            children: [
                                                                                                "p. ",
                                                                                                source.page
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                            lineNumber: 1757,
                                                                                            columnNumber: 55
                                                                                        }, this)
                                                                                    ]
                                                                                }, idx, true, {
                                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                    lineNumber: 1752,
                                                                                    columnNumber: 37
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                            lineNumber: 1750,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                    lineNumber: 1748,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isLastAssistantMessage && message.content && message.content.trim().length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 pt-3 border-t border-gray-200 flex flex-col sm:flex-row gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: (e)=>{
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                console.log('Export PDF button clicked');
                                                                                handleExport('pdf', message.content);
                                                                            },
                                                                            disabled: isExporting,
                                                                            className: `inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${isExporting ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer'}`,
                                                                            children: isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                        className: "w-3.5 h-3.5 animate-spin"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1783,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Exporting..."
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1788,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Export PDF"
                                                                                ]
                                                                            }, void 0, true)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                            lineNumber: 1766,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: (e)=>{
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                console.log('Copy button clicked');
                                                                                handleCopy(message.content);
                                                                            },
                                                                            disabled: isCopying || !message.content || message.content.trim().length === 0,
                                                                            className: `inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${isCopying || !message.content || message.content.trim().length === 0 ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer'}`,
                                                                            children: isCopying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                        className: "w-3.5 h-3.5 animate-spin"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1810,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Copying..."
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1815,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Copy"
                                                                                ]
                                                                            }, void 0, true)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                            lineNumber: 1793,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: (e)=>{
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                console.log('Export DOC button clicked');
                                                                                handleExport('doc', message.content);
                                                                            },
                                                                            disabled: isExporting,
                                                                            className: `inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${isExporting ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer'}`,
                                                                            children: isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                        className: "w-3.5 h-3.5 animate-spin"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1837,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Exporting..."
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                                        lineNumber: 1842,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    "Export DOC"
                                                                                ]
                                                                            }, void 0, true)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                            lineNumber: 1820,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                    lineNumber: 1765,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1739,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 1725,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1724,
                                                columnNumber: 23
                                            }, this)
                                        }, message.id, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1721,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full py-3 sm:py-4 bg-gray-50 border-b border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-4xl mx-auto px-3 sm:px-4 lg:px-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 sm:gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs",
                                                            children: "AI"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1860,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 1859,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                    className: "w-4 h-4 animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                    lineNumber: 1864,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm",
                                                                    children: "AI is thinking…"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                    lineNumber: 1865,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1863,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 1862,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1858,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1857,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                        lineNumber: 1856,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: messagesEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                        lineNumber: 1872,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 1690,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 1689,
                        columnNumber: 9
                    }, this),
                    showFormatOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-t border-gray-200 p-3 sm:p-4 max-h-[45vh] sm:max-h-[40vh] overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto px-1 sm:px-4 lg:px-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-3 sm:mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs sm:text-sm font-semibold text-gray-900",
                                            children: "How do you want the output?"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1884,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFormatOptions(false),
                                            className: "p-1 hover:bg-gray-100 rounded touch-target",
                                            "aria-label": "Close options",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4 text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1890,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1885,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1883,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2",
                                    children: formatOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedFormat(option.value),
                                            className: `px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors whitespace-nowrap flex-shrink-0 touch-target ${selectedFormat === option.value ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`,
                                            children: option.label
                                        }, option.value, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 1895,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1893,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2 sm:gap-4",
                                    children: selectedFormat === 'mcqs' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs sm:text-sm text-gray-700 font-medium",
                                                children: "Number of questions:"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1911,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    [
                                                        5,
                                                        10,
                                                        20
                                                    ].map((count)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setQuestionCount(count);
                                                                setWordCount(count);
                                                            },
                                                            className: `px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors touch-target ${questionCount === count ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`,
                                                            children: count
                                                        }, count, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1914,
                                                            columnNumber: 25
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Custom",
                                                        value: customWordCount,
                                                        onChange: (e)=>{
                                                            const val = e.target.value;
                                                            setCustomWordCount(val);
                                                            if (val) {
                                                                const numVal = parseInt(val) || 5;
                                                                setQuestionCount(numVal);
                                                                setWordCount(numVal);
                                                            }
                                                        },
                                                        className: "w-18 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 1929,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1912,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : selectedFormat !== 'quick-test' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs sm:text-sm text-gray-700 font-medium",
                                                children: "Word count:"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1948,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    [
                                                        50,
                                                        100,
                                                        200
                                                    ].map((count)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setWordCount(count);
                                                                setCustomWordCount('');
                                                            },
                                                            className: `px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors touch-target ${wordCount === count && !customWordCount ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`,
                                                            children: count
                                                        }, count, false, {
                                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                            lineNumber: 1951,
                                                            columnNumber: 25
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Custom",
                                                        value: customWordCount,
                                                        onChange: (e)=>{
                                                            const val = e.target.value;
                                                            setCustomWordCount(val);
                                                            if (val) {
                                                                setWordCount(parseInt(val) || 100);
                                                            }
                                                        },
                                                        className: "w-18 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 1966,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1949,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : null
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 1908,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 1882,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 1881,
                        columnNumber: 11
                    }, this),
                    showQuickTestDifficulty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-t border-blue-200 px-3 sm:px-6 py-3 sm:py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm sm:text-base font-semibold text-gray-800",
                                        children: "Choose Test Difficulty"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                        lineNumber: 1992,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            {
                                                value: 'easy',
                                                label: 'Easy (5 questions)',
                                                color: 'green'
                                            },
                                            {
                                                value: 'medium',
                                                label: 'Medium (7 questions)',
                                                color: 'yellow'
                                            },
                                            {
                                                value: 'hard',
                                                label: 'Hard (10 questions)',
                                                color: 'red'
                                            }
                                        ].map((difficulty)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleQuickTestDifficulty(difficulty.value),
                                                disabled: isGeneratingQuiz,
                                                className: `px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${difficulty.color === 'green' ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' : difficulty.color === 'yellow' ? 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100' : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'} disabled:opacity-50 disabled:cursor-not-allowed`,
                                                children: difficulty.label
                                            }, difficulty.value, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 1999,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                        lineNumber: 1993,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: resetQuickTest,
                                        className: "text-xs text-gray-500 hover:text-gray-700 self-start",
                                        disabled: isGeneratingQuiz,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                        lineNumber: 2015,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                lineNumber: 1991,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 1990,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 1989,
                        columnNumber: 11
                    }, this),
                    isGeneratingQuiz && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border-t border-gray-200 px-3 sm:px-6 py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-8 h-8 animate-spin text-blue-600 mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2031,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Please wait, preparing your test..."
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2032,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 2030,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 2029,
                        columnNumber: 11
                    }, this),
                    currentQuiz && !isGeneratingQuiz && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-t border-gray-200 px-3 sm:px-6 py-4 overflow-y-auto",
                        "data-quiz-container": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg sm:text-xl font-bold text-gray-900",
                                            children: [
                                                "Quick Test - ",
                                                quickTestDifficulty?.charAt(0).toUpperCase(),
                                                quickTestDifficulty?.slice(1),
                                                " Level",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-normal text-gray-600 ml-2",
                                                    children: [
                                                        "(",
                                                        currentQuiz.questions.length,
                                                        " question",
                                                        currentQuiz.questions.length !== 1 ? 's' : '',
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2044,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2042,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: resetQuickTest,
                                            className: "text-sm text-gray-500 hover:text-gray-700",
                                            disabled: quizSubmitted,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2053,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2048,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2041,
                                    columnNumber: 15
                                }, this),
                                !quizSubmitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        currentQuiz.questions.map((question, questionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 rounded-lg p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-gray-900 mb-3",
                                                        children: [
                                                            questionIndex + 1,
                                                            ". ",
                                                            question.question
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 2061,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: question.options.map((option, optionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-3 cursor-pointer hover:bg-white rounded-md p-2 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "radio",
                                                                        name: `question-${questionIndex}`,
                                                                        value: optionIndex,
                                                                        checked: userAnswers[questionIndex] === optionIndex,
                                                                        onChange: ()=>handleQuizAnswer(questionIndex, optionIndex),
                                                                        className: "w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                        lineNumber: 2070,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: option
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                        lineNumber: 2078,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, optionIndex, true, {
                                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                lineNumber: 2066,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 2064,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, questionIndex, true, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2060,
                                                columnNumber: 21
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center pt-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleQuizSubmit,
                                                disabled: Object.keys(userAnswers).length < currentQuiz.questions.length,
                                                className: "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                                children: "Submit Test"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2086,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2085,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2058,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 rounded-lg p-6 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-gray-900 mb-2",
                                                    children: "Test Results"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2098,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold text-blue-600 mb-2",
                                                    children: [
                                                        quizResults?.score,
                                                        "/",
                                                        quizResults?.total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2099,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg text-gray-600 mb-4",
                                                    children: [
                                                        "Score: ",
                                                        Math.round((quizResults?.score || 0) / (quizResults?.total || 1) * 100),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2102,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-700",
                                                    children: quizResults?.feedback
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2105,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2097,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold text-gray-900",
                                                    children: "Correct Answers:"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2109,
                                                    columnNumber: 21
                                                }, this),
                                                currentQuiz.questions.map((question, questionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-left p-3 rounded-lg ${userAnswers[questionIndex] === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-gray-900 mb-1",
                                                                children: [
                                                                    questionIndex + 1,
                                                                    ". ",
                                                                    question.question
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                lineNumber: 2114,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `text-sm ${userAnswers[questionIndex] === question.correct ? 'text-green-700' : 'text-red-700'}`,
                                                                children: [
                                                                    "Correct: ",
                                                                    question.options[question.correct],
                                                                    userAnswers[questionIndex] !== question.correct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-gray-600",
                                                                        children: [
                                                                            "Your answer: ",
                                                                            question.options[userAnswers[questionIndex]] || 'Not answered'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                        lineNumber: 2122,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                                lineNumber: 2117,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, questionIndex, true, {
                                                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                        lineNumber: 2111,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2108,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: resetQuickTest,
                                            className: "mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors",
                                            children: "Take Another Test"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2131,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2096,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 2040,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 2039,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "bg-white border-t border-gray-200 z-20 flex-shrink-0 pb-[max(env(safe-area-inset-bottom),8px)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mb-2 flex items-center justify-between flex-wrap gap-2 ${isKeyboardOpen ? 'hidden sm:flex' : 'flex'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 cursor-pointer touch-target",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: saveChat,
                                                    onChange: (e)=>setSaveChat(e.target.checked),
                                                    className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs sm:text-sm text-gray-700",
                                                    children: "Save chat"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2155,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2148,
                                            columnNumber: 15
                                        }, this),
                                        saveChat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-xs text-blue-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2159,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline text-[10px] uppercase tracking-wider font-bold",
                                                    children: "Autosave active"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                    lineNumber: 2160,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2158,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-end gap-1.5 sm:gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 border border-gray-300 rounded-2xl focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white min-w-0 transition-all",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                ref: textareaRef,
                                                value: input,
                                                onChange: (e)=>{
                                                    setInput(e.target.value);
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                                                },
                                                onKeyDown: handleKeyPress,
                                                onFocus: handleInputFocus,
                                                onPaste: handleInputPaste,
                                                placeholder: "Paste your content...",
                                                className: "w-full px-3 sm:px-4 py-2.5 sm:py-3 border-none rounded-2xl focus:ring-0 focus:outline-none resize-none text-sm sm:text-base bg-transparent max-h-[120px] leading-relaxed",
                                                rows: 1
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2167,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2166,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSend,
                                            disabled: !input.trim() || isLoading,
                                            className: "flex items-center justify-center bg-blue-600 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm hover:shadow-md touch-target",
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2189,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                className: "w-4 h-4 sm:w-5 sm:h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                                lineNumber: 2191,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                            lineNumber: 2183,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                    lineNumber: 2165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                            lineNumber: 2145,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 2144,
                        columnNumber: 9
                    }, this),
                    showToast.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-bottom-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                lineNumber: 2201,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: showToast.message
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                                lineNumber: 2202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 2200,
                        columnNumber: 11
                    }, this),
                    showFeedbackModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$FeedbackForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        userId: user?.id,
                        userEmail: user?.email,
                        onClose: ()=>setShowFeedbackModal(false),
                        onSubmitSuccess: ()=>{
                            setShowFeedbackModal(false);
                            setShowToast({
                                show: true,
                                message: 'Thank you for your feedback!'
                            });
                            setTimeout(()=>setShowToast({
                                    show: false,
                                    message: ''
                                }), 3000);
                        }
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                        lineNumber: 2208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                lineNumber: 1644,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
        lineNumber: 1641,
        columnNumber: 5
    }, this);
}
function ChatPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-8 h-8 animate-spin text-blue-600"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/chat/page.tsx",
                lineNumber: 2228,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
            lineNumber: 2227,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContent, {}, void 0, false, {
            fileName: "[project]/AI-SAAS/app/chat/page.tsx",
            lineNumber: 2231,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI-SAAS/app/chat/page.tsx",
        lineNumber: 2226,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46657e7b._.js.map