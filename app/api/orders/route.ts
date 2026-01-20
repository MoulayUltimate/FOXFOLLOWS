import { NextRequest, NextResponse } from 'next/server';
import { generateOrderId } from '@/lib/db';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items, email, status } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'No items in order' }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        const orders = [];
        const stmt = env.DB.prepare(`
            INSERT INTO orders (id, platform, service, quantity, price, username, email, payment_status, delivery_status, country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const batch = [];

        // Get country from headers
        const country = request.headers.get('cf-ipcountry') || 'Unknown';
        const initialStatus = status || 'pending';

        // Create one order per item (line-item based orders)
        for (const item of items) {
            const orderId = generateOrderId();
            orders.push(orderId);

            batch.push(stmt.bind(
                orderId,
                item.platform,
                item.service,
                item.quantity,
                item.price,
                item.username,
                email,
                initialStatus,
                'pending',
                country
            ));
        }

        await env.DB.batch(batch);

        return NextResponse.json({ success: true, orderIds: orders });

    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json({
            error: 'Failed to create order',
            details: error.message
        }, { status: 500 });
    }
}
