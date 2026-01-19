import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const text = await request.text();
        let body;
        try {
            body = JSON.parse(text);
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { username, password } = body;

        // Get credentials from environment variables
        // Fallback to default only if env vars are not set
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'foxfollows2024';

        if (username === adminUsername && password === adminPassword) {
            const token = btoa(JSON.stringify({ u: username, t: Date.now() }));

            const response = new Response(JSON.stringify({ success: true, username }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });

            // Manually set cookie header
            response.headers.append(
                'Set-Cookie',
                `admin_token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
            );

            return response;
        }

        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({
            error: 'Server Error',
            details: error?.message || 'Unknown'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET(request: NextRequest) {
    return new Response(JSON.stringify({ authenticated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE() {
    const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
    response.headers.append(
        'Set-Cookie',
        `admin_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
    );
    return response;
}
