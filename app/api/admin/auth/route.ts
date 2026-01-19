import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    return new Response(JSON.stringify({ message: 'Auth route is working' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function GET(request: NextRequest) {
    return new Response(JSON.stringify({ authenticated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE() {
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
