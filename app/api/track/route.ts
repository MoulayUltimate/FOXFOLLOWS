import { NextRequest, NextResponse } from 'next/server';
import { generateSessionId, getDeviceType } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, referrer } = body;

        if (!path) {
            return NextResponse.json({ error: 'Path is required' }, { status: 400 });
        }

        // Get geo info from Cloudflare headers
        const country = request.headers.get('cf-ipcountry') || 'Unknown';
        const city = request.headers.get('cf-ipcity') || 'Unknown';
        const userAgent = request.headers.get('user-agent') || '';
        const deviceType = getDeviceType(userAgent);

        // Get or create session ID from cookie
        let sessionId = request.cookies.get('ff_session')?.value;
        const isNewSession = !sessionId;
        if (!sessionId) {
            sessionId = generateSessionId();
        }

        // Get D1 binding from env
        const env = (request as any).env;
        if (!env?.DB) {
            // If no DB, just return success (for development)
            console.log('No DB configured, skipping tracking');
            const response = NextResponse.json({ success: true, tracked: false });
            if (isNewSession) {
                response.cookies.set('ff_session', sessionId, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                });
            }
            return response;
        }

        // Insert page view
        await env.DB.prepare(
            `INSERT INTO page_views (path, country, city, referrer, user_agent, session_id, device_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
            .bind(path, country, city, referrer || null, userAgent, sessionId, deviceType)
            .run();

        const response = NextResponse.json({ success: true, tracked: true });

        if (isNewSession) {
            response.cookies.set('ff_session', sessionId, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });
        }

        return response;
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}
