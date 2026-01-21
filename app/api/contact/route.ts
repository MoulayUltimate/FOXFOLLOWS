import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendTelegramNotification } from '@/lib/telegram';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, orderId } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { env, ctx } = getRequestContext() as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        await env.DB.prepare(`
            INSERT INTO contact_messages (name, email, subject, message, order_id, is_read)
            VALUES (?, ?, ?, ?, ?, 0)
        `)
            .bind(name, email, subject, message, orderId || null)
            .run();

        if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
            const notificationText = `<b>New Contact Message</b>\n\n<b>From:</b> ${name} (${email})\n<b>Subject:</b> ${subject}\n<b>Message:</b> ${message}`;
            ctx.waitUntil(sendTelegramNotification(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, notificationText));
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json({
            error: 'Failed to send message',
            details: error.message
        }, { status: 500 });
    }
}
