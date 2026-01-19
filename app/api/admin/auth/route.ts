import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST - Login
export async function POST(request: NextRequest) {
    try {
        // 1. Parse body safely
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const { username, password } = body;
        if (!username || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // 2. Get environment variables
        // On Cloudflare Pages, environment variables are available on process.env
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'foxfollows2024';

        // 3. Simple credential check
        if (username === adminUsername && password === adminPassword) {
            const response = NextResponse.json({ success: true, username });

            // Simple token
            const token = btoa(JSON.stringify({
                u: username,
                t: Date.now()
            }));

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
        // Always return JSON even on error
        return NextResponse.json({
            error: 'Server Error',
            details: error?.message || 'Unknown error'
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
        return NextResponse.json({ authenticated: true });
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
