import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET - Fetch all sessions or messages for a specific session
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ sessions: [], messages: [] });
        }

        if (sessionId) {
            // Fetch messages for a specific session
            const messages = await env.DB.prepare(
                'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC'
            )
                .bind(sessionId)
                .all();

            return NextResponse.json({ messages: messages?.results || [] });
        } else {
            // Fetch all active sessions
            const sessions = await env.DB.prepare(
                `SELECT cs.*, 
                (SELECT message FROM chat_messages WHERE session_id = cs.id ORDER BY created_at DESC LIMIT 1) as last_message,
                (SELECT COUNT(*) FROM chat_messages WHERE session_id = cs.id AND is_read = 0 AND sender = 'user') as unread_count
                FROM chat_sessions cs 
                ORDER BY last_message_at DESC`
            ).all();

            return NextResponse.json({ sessions: sessions?.results || [] });
        }
    } catch (error) {
        console.error('Admin chat fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch chat data' }, { status: 500 });
    }
}

// POST - Send a reply
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { sessionId, message } = body;

        if (!sessionId || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        await env.DB.prepare(
            'INSERT INTO chat_messages (session_id, sender, message, is_read) VALUES (?, ?, ?, 1)'
        )
            .bind(sessionId, 'admin', message)
            .run();

        // Update last message time
        await env.DB.prepare(
            "UPDATE chat_sessions SET last_message_at = datetime('now') WHERE id = ?"
        )
            .bind(sessionId)
            .run();

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Admin chat reply error:', error);
        return NextResponse.json({
            error: 'Failed to send reply',
            details: error.message
        }, { status: 500 });
    }
}

// PATCH - Mark messages as read
export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ success: true });
        }

        await env.DB.prepare(
            "UPDATE chat_messages SET is_read = 1 WHERE session_id = ? AND sender = 'user'"
        )
            .bind(sessionId)
            .run();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Mark read error:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
