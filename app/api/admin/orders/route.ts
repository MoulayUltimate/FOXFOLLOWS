import { NextRequest, NextResponse } from 'next/server';
import { generateOrderId } from '@/lib/db';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET - Fetch orders
export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status'); // pending, completed, failed, all
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Get D1 binding from env
        const env = getRequestContext().env as any;

        if (!env?.DB) {
            // Return mock data for development
            const mockOrders = [
                { id: 'ORD-ABC123', platform: 'Instagram', service: 'Followers', quantity: 1000, price: 9.99, username: '@user1', email: 'user1@test.com', payment_status: 'completed', delivery_status: 'completed', country: 'US', created_at: new Date().toISOString() },
                { id: 'ORD-DEF456', platform: 'TikTok', service: 'Likes', quantity: 500, price: 4.99, username: '@user2', email: 'user2@test.com', payment_status: 'completed', delivery_status: 'processing', country: 'UK', created_at: new Date().toISOString() },
                { id: 'ORD-GHI789', platform: 'YouTube', service: 'Subscribers', quantity: 100, price: 19.99, username: '@user3', email: 'user3@test.com', payment_status: 'pending', delivery_status: 'pending', country: 'DE', created_at: new Date().toISOString() },
            ];

            // Calculate summary
            const summary = {
                totalOrders: mockOrders.length,
                pendingOrders: mockOrders.filter(o => o.payment_status === 'pending').length,
                completedOrders: mockOrders.filter(o => o.payment_status === 'completed').length,
                failedOrders: mockOrders.filter(o => o.payment_status === 'failed').length,
                totalRevenue: mockOrders.reduce((sum, o) => sum + o.price, 0),
                todayRevenue: mockOrders.reduce((sum, o) => sum + o.price, 0),
            };

            return NextResponse.json({ success: true, orders: mockOrders, summary });
        }

        // Build query based on status filter
        let query = 'SELECT * FROM orders';
        const params: string[] = [];

        if (status && status !== 'all') {
            query += ' WHERE payment_status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(limit.toString(), offset.toString());

        const ordersResult = await env.DB.prepare(query).bind(...params).all();

        // Get summary stats
        const [total, pending, completed, failed, revenue, todayRev] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as count FROM orders').first(),
            env.DB.prepare("SELECT COUNT(*) as count FROM orders WHERE payment_status = 'pending'").first(),
            env.DB.prepare("SELECT COUNT(*) as count FROM orders WHERE payment_status = 'completed'").first(),
            env.DB.prepare("SELECT COUNT(*) as count FROM orders WHERE payment_status = 'failed'").first(),
            env.DB.prepare("SELECT COALESCE(SUM(price), 0) as total FROM orders WHERE payment_status = 'completed'").first(),
            env.DB.prepare("SELECT COALESCE(SUM(price), 0) as total FROM orders WHERE payment_status = 'completed' AND DATE(created_at) = DATE('now')").first(),
        ]);

        return NextResponse.json({
            success: true,
            orders: ordersResult?.results || [],
            summary: {
                totalOrders: total?.count || 0,
                pendingOrders: pending?.count || 0,
                completedOrders: completed?.count || 0,
                failedOrders: failed?.count || 0,
                totalRevenue: revenue?.total || 0,
                todayRevenue: todayRev?.total || 0,
            },
        });
    } catch (error) {
        console.error('Orders fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// POST - Create new order
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { platform, service, quantity, price, username, email, country } = body;

        if (!platform || !service || !quantity || !price || !username) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const orderId = generateOrderId();

        // Get D1 binding from env
        const env = (request as any).env;

        if (!env?.DB) {
            // Return success without saving for development
            return NextResponse.json({ success: true, orderId, saved: false });
        }

        await env.DB.prepare(
            `INSERT INTO orders (id, platform, service, quantity, price, username, email, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
            .bind(orderId, platform, service, quantity, price, username, email || null, country || null)
            .run();

        return NextResponse.json({ success: true, orderId, saved: true });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}

// PATCH - Update order status
export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { orderId, payment_status, delivery_status } = body;

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ success: true, updated: false });
        }

        const updates: string[] = [];
        const params: string[] = [];

        if (payment_status) {
            updates.push('payment_status = ?');
            params.push(payment_status);
        }
        if (delivery_status) {
            updates.push('delivery_status = ?');
            params.push(delivery_status);
        }

        updates.push("updated_at = datetime('now')");
        params.push(orderId);

        await env.DB.prepare(
            `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`
        )
            .bind(...params)
            .run();

        return NextResponse.json({ success: true, updated: true });
    } catch (error) {
        console.error('Order update error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

// DELETE - Delete order
export async function DELETE(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('id');

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ success: true, deleted: false });
        }

        await env.DB.prepare('DELETE FROM orders WHERE id = ?').bind(orderId).run();

        return NextResponse.json({ success: true, deleted: true });
    } catch (error) {
        console.error('Order delete error:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
