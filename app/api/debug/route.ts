export const runtime = 'edge';

export async function GET() {
    return new Response(JSON.stringify({
        status: 'ok',
        message: 'Minimal debug route working (Standard Response)'
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

