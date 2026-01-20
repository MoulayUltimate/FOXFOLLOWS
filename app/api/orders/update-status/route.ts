import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderIds, status, paymentStatus } = body;

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            return NextResponse.json({ error: 'No order IDs provided' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        const updateStatus = paymentStatus || status;

        // Create placeholders for IN clause: ?, ?, ?
        const placeholders = orderIds.map(() => '?').join(',');

        const stmt = env.DB.prepare(`
            UPDATE orders 
            SET payment_status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id IN (${placeholders})
        `);

        // Bind status first, then all IDs
        await stmt.bind(updateStatus, ...orderIds).run();

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Order update error:', error);
        return NextResponse.json({
            error: 'Failed to update order',
            details: error.message
        }, { status: 500 });
    }
}
