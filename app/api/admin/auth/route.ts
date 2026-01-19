import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// POST - Login
export async function POST(request: NextRequest) {
    try {
        // 1. Parse body safely
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { username, password } = body;
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        // 2. Get environment variables safely
        let env: any = {};
        try {
            const context = getRequestContext();
            if (context && context.env) {
                env = context.env;
            }
        } catch (e) {
            // Fallback for local
            env = process.env;
        }

        const adminUsername = env?.ADMIN_USERNAME || 'admin';
        const adminPassword = env?.ADMIN_PASSWORD || 'foxfollows2024';

        // 3. Simple credential check
        if (username === adminUsername && password === adminPassword) {
            const response = NextResponse.json({ success: true, username });

            // Set a simple session cookie
            // We'll use a simple string for now to rule out crypto issues
            const token = btoa(JSON.stringify({ username, exp: Date.now() + 86400000 }));

            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 86400, // 24 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    } catch (error: any) {
        console.error('Auth Error:', error);
        return NextResponse.json({
            error: 'Server error',
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

        try {
            const payload = JSON.parse(atob(token));
            if (payload.exp < Date.now()) {
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
            return NextResponse.json({ authenticated: true, username: payload.username });
        } catch (e) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
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
