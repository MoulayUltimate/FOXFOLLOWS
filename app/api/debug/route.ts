import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        // Gather diagnostic info
        const debugInfo = {
            timestamp: new Date().toISOString(),
            runtime: process.env.NEXT_RUNTIME || 'unknown', // 'edge' or 'nodejs'
            url: request.url,
            headers: Object.fromEntries(request.headers.entries()),
            cookies: request.headers.get('cookie'),
            // Check for common environment variables if safe to do so
            envCheck: {
                nodeEnv: process.env.NODE_ENV,
                hasDbBinding: 'DB' in process.env || typeof (globalThis as any).__env?.DB !== 'undefined'
            }
        };

        return NextResponse.json({
            status: 'ok',
            message: 'Debug endpoint is reachable',
            data: debugInfo
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            error: 'Failed to generate debug info',
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        return NextResponse.json({
            status: 'ok',
            message: 'POST request received',
            receivedBody: body,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            error: 'Failed to parse POST body',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 400 });
    }
}
