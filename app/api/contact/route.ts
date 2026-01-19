import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, orderId, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Name, email, subject, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Get D1 binding from env
        const env = (request as any).env;
        if (!env?.DB) {
            // If no DB, just return success (for development)
            console.log('No DB configured, message not saved:', { name, email, subject });
            return NextResponse.json({
                success: true,
                saved: false,
                message: 'Message received (DB not configured)'
            });
        }

        // Insert message into database
        const result = await env.DB.prepare(
            `INSERT INTO contact_messages (name, email, subject, order_id, message)
       VALUES (?, ?, ?, ?, ?)`
        )
            .bind(name, email, subject, orderId || null, message)
            .run();

        return NextResponse.json({
            success: true,
            saved: true,
            id: result.meta?.last_row_id
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to save message' },
            { status: 500 }
        );
    }
}
