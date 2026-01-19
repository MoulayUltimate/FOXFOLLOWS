import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
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

        let env: any = {};
        try {
            // Try to get Cloudflare env
            const ctx = getRequestContext();
            if (ctx && ctx.env) {
                env = ctx.env;
            }
        } catch (e) {
            // Fallback to process.env
            try {
                env = process.env || {};
            } catch (e2) {
                env = {};
            }
        }

        const adminUsername = env.ADMIN_USERNAME || 'admin';
        const adminPassword = env.ADMIN_PASSWORD || 'foxfollows2024';

        if (username === adminUsername && password === adminPassword) {
            const token = btoa(JSON.stringify({ u: username, t: Date.now() }));

            const response = new Response(JSON.stringify({ success: true, username }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });

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
            details: error?.message || 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET(request: Request) {
    return new Response(JSON.stringify({ authenticated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE(request: Request) {
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
