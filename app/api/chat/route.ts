import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET - Fetch messages for a session
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ messages: [] });
        }

        const messages = await env.DB.prepare(
            'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC'
        )
            .bind(sessionId)
            .all();

        return NextResponse.json({ messages: messages?.results || [] });
    } catch (error) {
        console.error('Chat fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

// POST - Send a message or start a session
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId, message, name, email } = body;

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        let currentSessionId = sessionId;

        // Check if session exists if ID provided
        if (currentSessionId) {
            const existingSession = await env.DB.prepare('SELECT id FROM chat_sessions WHERE id = ?')
                .bind(currentSessionId)
                .first();

            if (!existingSession) {
                currentSessionId = null; // Force creation of new session
            }
        }

        // If no session ID or invalid, create a new session
        if (!currentSessionId) {
            currentSessionId = crypto.randomUUID();
            await env.DB.prepare(
                'INSERT INTO chat_sessions (id, user_name, user_email) VALUES (?, ?, ?)'
            )
                .bind(currentSessionId, name || 'Visitor', email || null)
                .run();
        }

        if (message) {
            await env.DB.prepare(
                'INSERT INTO chat_messages (session_id, sender, message) VALUES (?, ?, ?)'
            )
                .bind(currentSessionId, 'user', message)
                .run();

            // Update last message time
            await env.DB.prepare(
                "UPDATE chat_sessions SET last_message_at = datetime('now'), status = 'active' WHERE id = ?"
            )
                .bind(currentSessionId)
                .run();
        }

        return NextResponse.json({ success: true, sessionId: currentSessionId });

    } catch (error: any) {
        console.error('Chat error:', error);
        return NextResponse.json({
            error: 'Failed to process chat',
            details: error.message
        }, { status: 500 });
    }
}
