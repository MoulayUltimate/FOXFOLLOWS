import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, verifyPassword } from '@/lib/db';
import { cookies } from 'next/headers';

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

        // Get D1 binding from env
        const env = (request as any).env;

        // Default admin credentials for development (when no DB)
        if (!env?.DB) {
            // Allow default admin login for development
            if (username === 'admin' && password === 'foxfollows2024') {
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
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Check credentials in database
        const user = await env.DB.prepare(
            'SELECT * FROM admin_users WHERE username = ?'
        )
            .bind(username)
            .first();

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

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
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
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
