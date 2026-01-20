import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function DELETE(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const env = getRequestContext().env as any;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database binding not found' }, { status: 500 });
        }

        // Delete all data from tables
        await env.DB.batch([
            env.DB.prepare('DELETE FROM orders'),
            env.DB.prepare('DELETE FROM contact_messages'),
            env.DB.prepare('DELETE FROM page_views'),
        ]);

        return NextResponse.json({
            success: true,
            message: 'All data has been reset successfully'
        });

    } catch (error) {
        console.error('Reset error:', error);
        return NextResponse.json({ error: 'Failed to reset data', details: String(error) }, { status: 500 });
    }
}
