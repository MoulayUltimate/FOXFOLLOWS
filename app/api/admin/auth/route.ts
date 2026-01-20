import { NextResponse } from 'next/server';

// Remove edge runtime to use nodejs_compat from wrangler.toml
// export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // HARDCODED CREDENTIALS
        const adminUsername = 'admin';
        const adminPassword = 'foxfollows2024';

        if (username === adminUsername && password === adminPassword) {
            // Use Buffer which is supported in nodejs_compat
            const token = Buffer.from(JSON.stringify({ u: username, t: Date.now() })).toString('base64');

            const response = NextResponse.json({ success: true, username });

            response.cookies.set({
                name: 'admin_token',
                value: token,
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 86400
            });

            return response;
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            {
                error: 'Server Error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ authenticated: true });
}

export async function DELETE(request: Request) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_token');
    return response;
}
