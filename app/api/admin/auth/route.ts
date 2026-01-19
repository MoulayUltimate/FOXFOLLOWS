import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/db';

export const runtime = 'edge';

// Safer Base64 encoding for Edge runtime
function base64Encode(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64Decode(str: string): string {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

// Simple JWT-like token
async function createToken(username: string): Promise<string> {
    const payload = {
        username,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    const payloadStr = JSON.stringify(payload);
    const encoder = new TextEncoder();
    const data = encoder.encode(payloadStr + 'foxfollows-secret-key-2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    return base64Encode(payloadStr) + '.' + hash;
}

async function verifyToken(token: string): Promise<{ valid: boolean; username?: string }> {
    try {
        const [payloadB64, hash] = token.split('.');
        const payloadStr = base64Decode(payloadB64);
        const payload = JSON.parse(payloadStr);

        if (payload.exp < Date.now()) {
            return { valid: false };
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(payloadStr + 'foxfollows-secret-key-2024');
        const expectedHashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = Array.from(new Uint8Array(expectedHashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (hash !== expectedHash) {
            return { valid: false };
        }

        return { valid: true, username: payload.username };
    } catch (e) {
        return { valid: false };
    }
}

// POST - Login
export async function POST(request: NextRequest) {
    try {
        // 1. Parse body safely
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { username, password } = body;
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        // 2. Get environment variables
        // Cloudflare Pages provides these in process.env and also in request context
        const env = (request as any).env || process.env || {};
        const adminUsername = env.ADMIN_USERNAME || 'admin';
        const adminPassword = env.ADMIN_PASSWORD || 'foxfollows2024';

        // 3. Check hardcoded/env credentials first
        let isAuth = false;
        if (username === adminUsername && password === adminPassword) {
            isAuth = true;
        }

        // 4. Check database if not already authenticated
        if (!isAuth && env.DB) {
            try {
                const user = await env.DB.prepare('SELECT * FROM admin_users WHERE username = ?')
                    .bind(username)
                    .first();

                if (user && await verifyPassword(password, user.password_hash)) {
                    isAuth = true;
                }
            } catch (dbError) {
                console.error('Database auth error:', dbError);
            }
        }

        if (isAuth) {
            const token = await createToken(username);
            const response = NextResponse.json({ success: true, username });

            // Set cookie
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    } catch (error: any) {
        console.error('Critical Auth Error:', error);
        return NextResponse.json({
            error: 'Server error during authentication',
            details: error?.message || 'Unknown'
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
