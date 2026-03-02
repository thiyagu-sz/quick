(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/AI-SAAS/app/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSupabaseClient",
    ()=>clearSupabaseClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getSupabaseClient",
    ()=>getSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
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
    supabaseInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            // Use localStorage for session storage (default)
            storage: ("TURBOPACK compile-time truthy", 1) ? window.localStorage : "TURBOPACK unreachable",
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AI-SAAS/app/components/LandingPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LandingPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(70);
    if ($[0] !== "cdf248885666beadeda506cd5cfe30a1378b208fdb3af085d28ef280bdce5504") {
        for(let $i = 0; $i < 70; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cdf248885666beadeda506cd5cfe30a1378b208fdb3af085d28ef280bdce5504";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const scrollToFeatures = _LandingPageScrollToFeatures;
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "flex items-center group cursor-pointer",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/applogo.png?v=3",
                alt: "QuickNotes Logo",
                className: "h-10 sm:h-12 md:h-14 w-auto object-contain"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 18,
                columnNumber: 76
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 18,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden md:flex items-center gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-main text-sm font-medium hover:text-primary transition-colors",
                    href: "#features",
                    children: "Features"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 25,
                    columnNumber: 61
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-main text-sm font-medium hover:text-primary transition-colors",
                    href: "#how-it-works",
                    children: "How it Works"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 25,
                    columnNumber: 177
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/login",
            className: "hidden sm:block text-sm font-medium text-text-main hover:text-primary",
            children: "Log in"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== router) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "sticky top-0 z-50 w-full border-b border-[#e7e7f3] glass-nav",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto",
                children: [
                    t0,
                    t1,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            t2,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "LandingPage[<button>.onClick]": ()=>router.push("/signup")
                                }["LandingPage[<button>.onClick]"],
                                className: "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-glow",
                                children: "Get Started"
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                lineNumber: 39,
                                columnNumber: 229
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 39,
                        columnNumber: 184
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 39,
                columnNumber: 88
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[4] = router;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 49,
                    columnNumber: 105
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 49,
                    columnNumber: 209
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center mb-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/applogo.png",
                    alt: "QuickNotes Logo",
                    className: "h-20 md:h-28 lg:h-32 w-auto object-contain drop-shadow-xl",
                    loading: "eager",
                    decoding: "async"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 56,
                    columnNumber: 74
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 56,
                columnNumber: 65
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm mb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex h-2 w-2 rounded-full bg-primary animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 63,
                    columnNumber: 128
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold text-primary uppercase tracking-wide",
                    children: "Powered by OpenRouter AI Models"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 63,
                    columnNumber: 199
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    let t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-text-main text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight",
            children: [
                "Turn lecture PDFs into",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 72,
                    columnNumber: 136
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600",
                    children: "exam-ready notes."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 72,
                    columnNumber: 142
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-text-muted text-lg md:text-xl font-normal max-w-2xl leading-relaxed",
            children: "Quickly convert dense textbooks and slides into structured study guides. Save hours of preparation and focus on what actually matters."
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-text-muted text-xs italic",
            children: "Uses advanced open-source language models for high-accuracy extraction."
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[9] = t7;
        $[10] = t8;
        $[11] = t9;
    } else {
        t7 = $[9];
        t8 = $[10];
        t9 = $[11];
    }
    let t10;
    if ($[12] !== router) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "LandingPage[<button>.onClick]": ()=>router.push("/signup")
            }["LandingPage[<button>.onClick]"],
            className: "flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5",
            children: "Try for Free"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 85,
            columnNumber: 11
        }, this);
        $[12] = router;
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: scrollToFeatures,
            className: "flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-text-main text-base font-bold transition-all",
            children: "View Features"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 95,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl text-center flex flex-col gap-6 items-center z-10",
            children: [
                t5,
                t6,
                t7,
                t8,
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap justify-center gap-4 pt-4",
                    children: [
                        t10,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 102,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        $[15] = t10;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-2.5 h-2.5 rounded-full bg-red-400/60"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 110,
                    columnNumber: 97
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-2.5 h-2.5 rounded-full bg-yellow-400/60"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 110,
                    columnNumber: 155
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-2.5 h-2.5 rounded-full bg-green-400/60"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 110,
                    columnNumber: 216
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-16 w-full max-w-5xl relative group perspective-1000",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500",
                    children: [
                        t13,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-[16/9] w-full bg-cover bg-center",
                            style: {
                                backgroundImage: "url('/demo.png')"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full bg-gradient-to-tr from-white/10 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                lineNumber: 119,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 117,
                            columnNumber: 252
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 117,
                    columnNumber: 83
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -inset-4 bg-primary/20 blur-2xl -z-10 rounded-[30px] opacity-60"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 119,
                    columnNumber: 104
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 117,
            columnNumber: 11
        }, this);
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    let t15;
    if ($[19] !== t12) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative flex flex-col items-center pt-16 pb-20 px-4 md:px-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-background-light to-background-light overflow-hidden",
            children: [
                t4,
                t12,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t15;
    } else {
        t15 = $[20];
    }
    let t16;
    let t17;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-text-main text-lg font-bold",
            children: "Built for Students • Exam-Ready Output • Privacy Focused"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden md:block w-px h-8 bg-gray-200"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, this);
        $[21] = t16;
        $[22] = t17;
    } else {
        t16 = $[21];
        t17 = $[22];
    }
    let t18;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary",
                    children: "verified_user"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 145,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold",
                    children: "Secure"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 145,
                    columnNumber: 129
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary",
                    children: "bolt"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 152,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold",
                    children: "Fast"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 152,
                    columnNumber: 120
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 152,
            columnNumber: 11
        }, this);
        $[24] = t19;
    } else {
        t19 = $[24];
    }
    let t20;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "border-y border-[#e7e7f3] bg-white py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left",
                children: [
                    t16,
                    t17,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all",
                        children: [
                            t18,
                            t19,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-primary",
                                        children: "lock"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 159,
                                        columnNumber: 372
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold",
                                        children: "Private"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 159,
                                        columnNumber: 440
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                lineNumber: 159,
                                columnNumber: 331
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 159,
                        columnNumber: 226
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 159,
                columnNumber: 72
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[25] = t20;
    } else {
        t20 = $[25];
    }
    let t21;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-12 text-center md:text-left",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-primary text-sm font-bold uppercase tracking-wider mb-2",
                    children: "Powerful Features"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 166,
                    columnNumber: 59
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-text-main text-3xl md:text-4xl font-bold leading-tight",
                    children: "Everything you need to ace the exam"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 166,
                    columnNumber: 158
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[26] = t21;
    } else {
        t21 = $[26];
    }
    let t22;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "size-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "material-symbols-outlined text-[28px]",
                children: "auto_awesome"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 173,
                columnNumber: 168
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[27] = t22;
    } else {
        t22 = $[27];
    }
    let t23;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group flex flex-col gap-4 rounded-xl border border-[#cfcfe7] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-1",
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-text-main text-lg font-bold",
                            children: "Smart Summary"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 180,
                            columnNumber: 222
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted text-sm leading-relaxed",
                            children: "Turn 50-page PDFs into 5-page clear summaries focusing on key exam topics."
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 180,
                            columnNumber: 289
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 180,
                    columnNumber: 185
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[28] = t23;
    } else {
        t23 = $[28];
    }
    let t24;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "size-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "material-symbols-outlined text-[28px]",
                children: "chat_bubble"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 187,
                columnNumber: 176
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[29] = t24;
    } else {
        t24 = $[29];
    }
    let t25;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group flex flex-col gap-4 rounded-xl border border-[#cfcfe7] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-1",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-text-main text-lg font-bold",
                            children: "Study Assistant"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 194,
                            columnNumber: 222
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted text-sm leading-relaxed",
                            children: "Ask questions directly to your documents to clarify complex formulas or dates."
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 194,
                            columnNumber: 291
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 194,
                    columnNumber: 185
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[30] = t25;
    } else {
        t25 = $[30];
    }
    let t26;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "size-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "material-symbols-outlined text-[28px]",
                children: "ios_share"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 201,
                columnNumber: 176
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[31] = t26;
    } else {
        t26 = $[31];
    }
    let t27;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group flex flex-col gap-4 rounded-xl border border-[#cfcfe7] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-1",
            children: [
                t26,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-text-main text-lg font-bold",
                            children: "Pro PDF Export"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 208,
                            columnNumber: 222
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted text-sm leading-relaxed",
                            children: "Export your AI-generated notes into beautifully formatted, branded PDFs for printing."
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 208,
                            columnNumber: 290
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 208,
                    columnNumber: 185
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 208,
            columnNumber: 11
        }, this);
        $[32] = t27;
    } else {
        t27 = $[32];
    }
    let t28;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "size-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "material-symbols-outlined text-[28px]",
                children: "history"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 215,
                columnNumber: 179
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[33] = t28;
    } else {
        t28 = $[33];
    }
    let t29;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-20 px-4 md:px-10 max-w-7xl mx-auto",
            id: "features",
            children: [
                t21,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                    children: [
                        t23,
                        t25,
                        t27,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group flex flex-col gap-4 rounded-xl border border-[#cfcfe7] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-1",
                            children: [
                                t28,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-text-main text-lg font-bold",
                                            children: "History Archive"
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                            lineNumber: 222,
                                            columnNumber: 385
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-text-muted text-sm leading-relaxed",
                                            children: "All your uploaded materials and generated notes are saved securely for later review."
                                        }, void 0, false, {
                                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                            lineNumber: 222,
                                            columnNumber: 454
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 222,
                                    columnNumber: 348
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 222,
                            columnNumber: 174
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 222,
                    columnNumber: 89
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[34] = t29;
    } else {
        t29 = $[34];
    }
    let t30;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl md:text-4xl font-bold text-text-main mb-4",
                    children: "From PDF to A+ in 3 steps"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 229,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-lg max-w-2xl mx-auto",
                    children: "Stop highlighting everything. Let AI identify what actually matters for your exams."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 229,
                    columnNumber: 143
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[35] = t30;
    } else {
        t30 = $[35];
    }
    let t31;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[36] = t31;
    } else {
        t31 = $[36];
    }
    let t32;
    if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "size-24 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center mb-4 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-[40px] text-blue-500",
                            children: "upload_file"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 243,
                            columnNumber: 204
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-3 -right-3 size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md",
                            children: "1"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 243,
                            columnNumber: 292
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 243,
                    columnNumber: 73
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-text-main",
                    children: "Upload Materials"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 243,
                    columnNumber: 450
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-sm max-w-[280px]",
                    children: "Upload your course slides, textbooks, or research papers."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 243,
                    columnNumber: 520
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[37] = t32;
    } else {
        t32 = $[37];
    }
    let t33;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "size-24 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center mb-4 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-[40px] text-purple-500",
                            children: "auto_fix_high"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 250,
                            columnNumber: 204
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-3 -right-3 size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md",
                            children: "2"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 250,
                            columnNumber: 296
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 250,
                    columnNumber: 73
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-text-main",
                    children: "AI Extraction"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 250,
                    columnNumber: 454
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-sm max-w-[280px]",
                    children: "Our advanced LLMs process the text and extract essential study points."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 250,
                    columnNumber: 521
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[38] = t33;
    } else {
        t33 = $[38];
    }
    let t34;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-20 px-4 md:px-10 bg-white border-y border-[#e7e7f3]",
            id: "how-it-works",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    t30,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-8 relative",
                        children: [
                            t31,
                            t32,
                            t33,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center text-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-24 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center mb-4 relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-[40px] text-emerald-500",
                                                children: "history_edu"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                                lineNumber: 257,
                                                columnNumber: 417
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-3 -right-3 size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md",
                                                children: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                                lineNumber: 257,
                                                columnNumber: 508
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 257,
                                        columnNumber: 286
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-text-main",
                                        children: "Study & Ace"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 257,
                                        columnNumber: 666
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-text-muted text-sm max-w-[280px]",
                                        children: "Download your polished notes or chat with the AI to drill down on specifics."
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 257,
                                        columnNumber: 735
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                lineNumber: 257,
                                columnNumber: 224
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 257,
                        columnNumber: 145
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 257,
                columnNumber: 105
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[39] = t34;
    } else {
        t34 = $[39];
    }
    let t35;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl md:text-4xl font-bold text-text-main mb-4",
                children: "Built for every study scenario"
            }, void 0, false, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 264,
                columnNumber: 34
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 264,
            columnNumber: 11
        }, this);
        $[40] = t35;
    } else {
        t35 = $[40];
    }
    let t36;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 inline-flex p-2 bg-white rounded-lg shadow-sm text-primary",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined",
                        children: "school"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 271,
                        columnNumber: 201
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 271,
                    columnNumber: 120
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold text-text-main mb-2",
                    children: "Exam Prep"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 271,
                    columnNumber: 264
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-sm",
                    children: "Condense semester-long courses into 5-page high-impact cheat sheets."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 271,
                    columnNumber: 332
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[41] = t36;
    } else {
        t36 = $[41];
    }
    let t37;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 inline-flex p-2 bg-white rounded-lg shadow-sm text-orange-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined",
                        children: "timer"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 278,
                        columnNumber: 204
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 278,
                    columnNumber: 120
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold text-text-main mb-2",
                    children: "Quick Revision"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 278,
                    columnNumber: 266
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-sm",
                    children: "Extract key definitions and formulas minutes before your next lecture or test."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 278,
                    columnNumber: 339
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 278,
            columnNumber: 11
        }, this);
        $[42] = t37;
    } else {
        t37 = $[42];
    }
    let t38;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 inline-flex p-2 bg-white rounded-lg shadow-sm text-pink-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined",
                        children: "slideshow"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 285,
                        columnNumber: 202
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 285,
                    columnNumber: 120
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold text-text-main mb-2",
                    children: "Slide Summaries"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 285,
                    columnNumber: 268
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-muted text-sm",
                    children: "Turn 100+ PowerPoint slides into structured bullet points for fast reading."
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 285,
                    columnNumber: 342
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 285,
            columnNumber: 11
        }, this);
        $[43] = t38;
    } else {
        t38 = $[43];
    }
    let t39;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-20 px-4 md:px-10 max-w-7xl mx-auto",
            children: [
                t35,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                    children: [
                        t36,
                        t37,
                        t38,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 inline-flex p-2 bg-white rounded-lg shadow-sm text-cyan-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined",
                                        children: "assignment"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 292,
                                        columnNumber: 351
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 292,
                                    columnNumber: 269
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-text-main mb-2",
                                    children: "Research"
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 292,
                                    columnNumber: 418
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-muted text-sm",
                                    children: "Understand complex academic papers faster to write better assignments."
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 292,
                                    columnNumber: 485
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 292,
                            columnNumber: 160
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 292,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[44] = t39;
    } else {
        t39 = $[44];
    }
    let t40;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 opacity-10",
            style: {
                backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "32px 32px"
            }
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[45] = t40;
    } else {
        t40 = $[45];
    }
    let t41;
    let t42;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-white text-3xl md:text-5xl font-black tracking-tight max-w-2xl",
            children: "Start preparing smarter today"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-blue-100 text-lg md:text-xl max-w-xl",
            children: "Join students using QuickNotes to optimize their study time."
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 311,
            columnNumber: 11
        }, this);
        $[46] = t41;
        $[47] = t42;
    } else {
        t41 = $[46];
        t42 = $[47];
    }
    let t43;
    if ($[48] !== router) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "LandingPage[<button>.onClick]": ()=>router.push("/signup")
            }["LandingPage[<button>.onClick]"],
            className: "flex items-center justify-center rounded-lg h-14 px-8 bg-white text-primary text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5",
            children: "Create Free Account"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        $[48] = router;
        $[49] = t43;
    } else {
        t43 = $[49];
    }
    let t44;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: scrollToFeatures,
            className: "flex items-center justify-center rounded-lg h-14 px-8 bg-primary-dark/30 text-white border border-white/20 text-lg font-bold hover:bg-primary-dark/50 transition-all",
            children: "View Features"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[50] = t44;
    } else {
        t44 = $[50];
    }
    let t45;
    if ($[51] !== t43) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col sm:flex-row gap-4 mt-4",
            children: [
                t43,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 337,
            columnNumber: 11
        }, this);
        $[51] = t43;
        $[52] = t45;
    } else {
        t45 = $[52];
    }
    let t46;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-blue-200 text-sm mt-4",
            children: "No credit card required • Student-focused AI"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 345,
            columnNumber: 11
        }, this);
        $[53] = t46;
    } else {
        t46 = $[53];
    }
    let t47;
    if ($[54] !== t45) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "px-4 md:px-10 pb-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto rounded-3xl bg-primary relative overflow-hidden px-6 py-20 text-center shadow-2xl",
                children: [
                    t40,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col items-center gap-6",
                        children: [
                            t41,
                            t42,
                            t45,
                            t46
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 352,
                        columnNumber: 174
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 352,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 352,
            columnNumber: 11
        }, this);
        $[54] = t45;
        $[55] = t47;
    } else {
        t47 = $[55];
    }
    let t48;
    let t49;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-text-main",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/applogo.png?v=3",
                    alt: "Logo",
                    className: "h-8 sm:h-10 md:h-12 w-auto object-contain"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 361,
                    columnNumber: 67
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold",
                    children: "QuickNotes"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 361,
                    columnNumber: 162
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-text-muted text-sm max-w-xs",
            children: "Empowering students with AI tools to learn faster, retain more, and stress less during exam season."
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 362,
            columnNumber: 11
        }, this);
        $[56] = t48;
        $[57] = t49;
    } else {
        t48 = $[56];
        t49 = $[57];
    }
    let t50;
    if ($[58] === Symbol.for("react.memo_cache_sentinel")) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "sr-only",
            children: "Twitter"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 371,
            columnNumber: 11
        }, this);
        $[58] = t50;
    } else {
        t50 = $[58];
    }
    let t51;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            className: "text-text-muted hover:text-primary",
            href: "#",
            children: [
                t50,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 378,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 378,
                    columnNumber: 75
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[59] = t51;
    } else {
        t51 = $[59];
    }
    let t52;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "sr-only",
            children: "GitHub"
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[60] = t52;
    } else {
        t52 = $[60];
    }
    let t53;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "col-span-2 lg:col-span-2 flex flex-col gap-4",
            children: [
                t48,
                t49,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 mt-2",
                    children: [
                        t51,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            className: "text-text-muted hover:text-primary",
                            href: "https://github.com/thiyagu-sz",
                            children: [
                                t52,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-5 w-5",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        clipRule: "evenodd",
                                        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                                        fillRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                        lineNumber: 392,
                                        columnNumber: 278
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 392,
                                    columnNumber: 213
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 392,
                            columnNumber: 121
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 392,
                    columnNumber: 83
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 392,
            columnNumber: 11
        }, this);
        $[61] = t53;
    } else {
        t53 = $[61];
    }
    let t54;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-bold text-text-main text-sm",
                    children: "Product"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 399,
                    columnNumber: 48
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-muted text-sm hover:text-primary",
                    href: "#features",
                    children: "Features"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 399,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-muted text-sm hover:text-primary",
                    href: "#how-it-works",
                    children: "How it Works"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 399,
                    columnNumber: 196
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-muted text-sm hover:text-primary",
                    href: "mailto:thiyaguai2004@gmail.com",
                    children: "Report a Bug"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 399,
                    columnNumber: 291
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 399,
            columnNumber: 11
        }, this);
        $[62] = t54;
    } else {
        t54 = $[62];
    }
    let t55;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-bold text-text-main text-sm",
                    children: "Developer"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 406,
                    columnNumber: 48
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-muted text-sm hover:text-primary",
                    href: "https://thiyagu-portfolio.me",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Portfolio"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 406,
                    columnNumber: 111
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "text-text-muted text-sm hover:text-primary",
                    href: "https://thiyagu-portfolio.me/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Contact"
                }, void 0, false, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 406,
                    columnNumber: 260
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 406,
            columnNumber: 11
        }, this);
        $[63] = t55;
    } else {
        t55 = $[63];
    }
    let t56;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12",
            children: [
                t53,
                t54,
                t55,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-text-main text-sm",
                            children: "Legal"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 413,
                            columnNumber: 139
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            className: "text-text-muted text-sm hover:text-primary",
                            href: "/privacy",
                            children: "Privacy Policy"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 413,
                            columnNumber: 198
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            className: "text-text-muted text-sm hover:text-primary",
                            href: "/terms",
                            children: "Terms of Service"
                        }, void 0, false, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 413,
                            columnNumber: 290
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                    lineNumber: 413,
                    columnNumber: 102
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 413,
            columnNumber: 11
        }, this);
        $[64] = t56;
    } else {
        t56 = $[64];
    }
    let t57;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "bg-background-light border-t border-[#e7e7f3] pt-16 pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 md:px-10 max-w-7xl mx-auto",
                children: [
                    t56,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#e7e7f3] pt-8 flex flex-col md:flex-row justify-between items-center gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center md:items-start gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-muted text-xs",
                                    children: "The AI model powering QuickNotes is currently in beta. If you encounter any issues, please report them to help improve the product."
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 420,
                                    columnNumber: 316
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-muted text-sm",
                                    children: "© 2026 QuickNotes. All rights reserved."
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 420,
                                    columnNumber: 490
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-muted text-xs",
                                    children: "Independently built and maintained by Thiyagu."
                                }, void 0, false, {
                                    fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                                    lineNumber: 420,
                                    columnNumber: 572
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                            lineNumber: 420,
                            columnNumber: 251
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                        lineNumber: 420,
                        columnNumber: 142
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
                lineNumber: 420,
                columnNumber: 88
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[65] = t57;
    } else {
        t57 = $[65];
    }
    let t58;
    if ($[66] !== t15 || $[67] !== t3 || $[68] !== t47) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background-light text-text-main antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden",
            children: [
                t3,
                t15,
                t20,
                t29,
                t34,
                t39,
                t47,
                t57
            ]
        }, void 0, true, {
            fileName: "[project]/AI-SAAS/app/components/LandingPage.tsx",
            lineNumber: 427,
            columnNumber: 11
        }, this);
        $[66] = t15;
        $[67] = t3;
        $[68] = t47;
        $[69] = t58;
    } else {
        t58 = $[69];
    }
    return t58;
}
_s(LandingPage, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LandingPage;
function _LandingPageScrollToFeatures() {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AI-SAAS/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI-SAAS/app/components/LandingPage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "805d3eaadbc2600d00c9b1a7c32b5ce9d372f0fcc177a1d745f8f42cbd25882c") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "805d3eaadbc2600d00c9b1a7c32b5ce9d372f0fcc177a1d745f8f42cbd25882c";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    let t1;
    if ($[1] !== router) {
        t0 = ({
            "Home[useEffect()]": ()=>{
                const checkAuthAndRedirect = {
                    "Home[useEffect() > checkAuthAndRedirect]": async ()=>{
                        ;
                        try {
                            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseClient"])();
                            const { data: t3 } = await supabase.auth.getUser();
                            const { user } = t3;
                            if (user) {
                                router.push("/chat");
                            }
                        } catch (t2) {
                            const error = t2;
                            console.error("Auth check error:", error);
                        }
                    }
                }["Home[useEffect() > checkAuthAndRedirect]"];
                checkAuthAndRedirect();
            }
        })["Home[useEffect()]"];
        t1 = [
            router
        ];
        $[1] = router;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$app$2f$components$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/AI-SAAS/app/page.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_s(Home, "vQduR7x+OPXj6PSmJyFnf+hU7bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AI$2d$SAAS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=AI-SAAS_app_21e7d535._.js.map