import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET - Fetch messages
export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get('unread') === 'true';
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Get D1 binding from env
        const env = getRequestContext().env as any;

        if (!env?.DB) {
            // Return mock data for development
            const mockMessages = [
                { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'order', order_id: 'ORD-ABC123', message: 'My order is delayed, please help!', is_read: 0, created_at: new Date().toISOString() },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'refund', order_id: null, message: 'I would like to request a refund for my recent purchase.', is_read: 0, created_at: new Date(Date.now() - 3600000).toISOString() },
                { id: 3, name: 'Bob Wilson', email: 'bob@example.com', subject: 'other', order_id: null, message: 'Do you offer custom packages?', is_read: 1, created_at: new Date(Date.now() - 86400000).toISOString() },
            ];

            const summary = {
                totalMessages: mockMessages.length,
                unreadMessages: mockMessages.filter(m => m.is_read === 0).length,
            };

            return NextResponse.json({ success: true, messages: mockMessages, summary });
        }

        // Build query
        let query = 'SELECT * FROM contact_messages';
        if (unreadOnly) {
            query += ' WHERE is_read = 0';
        }
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

        const messagesResult = await env.DB.prepare(query)
            .bind(limit, offset)
            .all();

        // Get summary stats
        const [total, unread] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as count FROM contact_messages').first(),
            env.DB.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0').first(),
        ]);

        return NextResponse.json({
            success: true,
            messages: messagesResult?.results || [],
            summary: {
                totalMessages: total?.count || 0,
                unreadMessages: unread?.count || 0,
            },
        });
    } catch (error) {
        console.error('Messages fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

// PATCH - Mark message as read/unread
export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { messageId, is_read } = body;

        if (messageId === undefined || is_read === undefined) {
            return NextResponse.json({ error: 'Message ID and is_read are required' }, { status: 400 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ success: true, updated: false });
        }

        await env.DB.prepare('UPDATE contact_messages SET is_read = ? WHERE id = ?')
            .bind(is_read ? 1 : 0, messageId)
            .run();

        return NextResponse.json({ success: true, updated: true });
    } catch (error) {
        console.error('Message update error:', error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}

// DELETE - Delete message
export async function DELETE(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const messageId = searchParams.get('id');

        if (!messageId) {
            return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ success: true, deleted: false });
        }

        await env.DB.prepare('DELETE FROM contact_messages WHERE id = ?')
            .bind(parseInt(messageId))
            .run();

        return NextResponse.json({ success: true, deleted: true });
    } catch (error) {
        console.error('Message delete error:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
