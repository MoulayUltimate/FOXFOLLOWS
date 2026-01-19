import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, verifyPassword } from '@/lib/db';
import { cookies } from 'next/headers';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// Simple JWT-like token (for demo purposes)
async function createToken(username: string): Promise<string> {
    const payload = {
        username,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload) + 'foxfollows-secret');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return btoa(JSON.stringify(payload)) + '.' + hash;
}

async function verifyToken(token: string): Promise<{ valid: boolean; username?: string }> {
    try {
        const [payloadB64, hash] = token.split('.');
        const payload = JSON.parse(atob(payloadB64));

        if (payload.exp < Date.now()) {
            return { valid: false };
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(payload) + 'foxfollows-secret');
        const expectedHashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = Array.from(new Uint8Array(expectedHashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (hash !== expectedHash) {
            return { valid: false };
        }

        return { valid: true, username: payload.username };
    } catch {
        return { valid: false };
    }
}

// POST - Login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Get env bindings
        let env: any = {};
        try {
            const ctx = getRequestContext();
            if (ctx && ctx.env) {
                env = ctx.env;
            }
        } catch (e) {
            console.log('getRequestContext failed, falling back to process.env');
        }

        // Get admin credentials from environment variables (check both env and process.env)
        const adminUsername = env?.ADMIN_USERNAME || process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = env?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'foxfollows2024';

        console.log('Attempting login for:', username);

        // Simple credential check using environment variables
        if (username === adminUsername && password === adminPassword) {
            const token = await createToken(username);
            const response = NextResponse.json({ success: true, username });
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60, // 24 hours
                path: '/',
            });
            return response;
        }

        // If env credentials don't match, check database as fallback
        const db = env?.DB || (process.env as any)?.DB;
        if (db) {
            try {
                const user = await db.prepare(
                    'SELECT * FROM admin_users WHERE username = ?'
                )
                    .bind(username)
                    .first();

                if (user) {
                    const isValid = await verifyPassword(password, user.password_hash);
                    if (isValid) {
                        const token = await createToken(username);
                        const response = NextResponse.json({ success: true, username });
                        response.cookies.set('admin_token', token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            maxAge: 24 * 60 * 60,
                            path: '/',
                        });
                        return response;
                    }
                }
            } catch (dbError) {
                console.error('Database auth error:', dbError);
                // Continue to return invalid credentials if DB fails
            }
        }

        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    } catch (error: any) {
        console.error('Auth error:', error);
        return NextResponse.json({
            error: 'Authentication failed',
            details: error?.message || String(error)
        }, { status: 500 });
    }
}

// GET - Check auth status
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const result = await verifyToken(token);
        if (!result.valid) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({ authenticated: true, username: result.username });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}

// DELETE - Logout
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_token');
    return response;
}
