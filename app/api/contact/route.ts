import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, orderId } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        await env.DB.prepare(`
            INSERT INTO contact_messages (name, email, subject, message, order_id, is_read)
            VALUES (?, ?, ?, ?, ?, 0)
        `)
            .bind(name, email, subject, message, orderId || null)
            .run();

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json({
            error: 'Failed to send message',
            details: error.message
        }, { status: 500 });
    }
}
