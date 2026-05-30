import { NextRequest, NextResponse } from 'next/server';
import { generatePrintableHTML } from '@/app/lib/professionalPdfGenerator';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { ErrorHandler } from '@/app/lib/errors/errorHandler';

export async function OPTIONS() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || '';
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

/**
 * Returns a browser-printable HTML document from markdown.
 * The client opens this in a new window; the user clicks "Save as PDF"
 * to produce a SaaS-grade PDF via the browser's native renderer.
 */
export async function POST(request: NextRequest) {
  try {
    await requireAuth(request);

    const { markdown, title } = await request.json();

    if (!markdown) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 });
    }

    if (markdown.length > 500_000) {
      return NextResponse.json({ error: 'Content too large (max 500 KB)' }, { status: 413 });
    }

    const html = generatePrintableHTML(
      markdown,
      title || 'Study Notes',
    );

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, private',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '',
      },
    });
  } catch (error: any) {
    return ErrorHandler.handle(error, 'POST /api/chat/pdf');
  }
}
