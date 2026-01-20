import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period') || '7d'; // 7d, 30d, all

        // Get D1 binding from env
        const env = getRequestContext().env as any;

        if (!env?.DB) {
            // Return mock data for development
            return NextResponse.json({
                success: true,
                data: {
                    totalPageViews: 1245,
                    uniqueVisitors: 423,
                    topCountries: [
                        { country: 'US', count: 234 },
                        { country: 'UK', count: 156 },
                        { country: 'DE', count: 89 },
                        { country: 'FR', count: 67 },
                        { country: 'CA', count: 45 },
                    ],
                    topPages: [
                        { path: '/', count: 456 },
                        { path: '/instagram', count: 234 },
                        { path: '/tiktok', count: 189 },
                        { path: '/youtube', count: 145 },
                        { path: '/checkout', count: 98 },
                    ],
                    viewsByDay: [
                        { date: '2024-01-13', count: 145 },
                        { date: '2024-01-14', count: 189 },
                        { date: '2024-01-15', count: 234 },
                        { date: '2024-01-16', count: 178 },
                        { date: '2024-01-17', count: 256 },
                        { date: '2024-01-18', count: 198 },
                        { date: '2024-01-19', count: 45 },
                    ],
                    deviceBreakdown: [
                        { device: 'mobile', count: 567 },
                        { device: 'desktop', count: 523 },
                        { device: 'tablet', count: 155 },
                    ],
                },
            });
        }

        // Calculate date range
        let dateFilter = '';
        const now = new Date();
        if (period === '7d') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            dateFilter = `AND created_at >= '${weekAgo.toISOString()}'`;
        } else if (period === '30d') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            dateFilter = `AND created_at >= '${monthAgo.toISOString()}'`;
        }

        // Calculate live activity (last 5 mins)
        const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

        // Fetch analytics data
        const [
            totalViews,
            uniqueVisitors,
            topCountries,
            topPages,
            viewsByDay,
            deviceBreakdown,
            activeCarts,
            checkingOut,
            purchased
        ] = await Promise.all([
            env.DB.prepare(`SELECT COUNT(*) as count FROM page_views WHERE 1=1 ${dateFilter}`).first(),
            env.DB.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE 1=1 ${dateFilter}`).first(),
            env.DB.prepare(`SELECT country, COUNT(*) as count FROM page_views WHERE country IS NOT NULL ${dateFilter} GROUP BY country ORDER BY count DESC LIMIT 10`).all(),
            env.DB.prepare(`SELECT path, COUNT(*) as count FROM page_views WHERE 1=1 ${dateFilter} GROUP BY path ORDER BY count DESC LIMIT 10`).all(),
            env.DB.prepare(`SELECT DATE(created_at) as date, COUNT(*) as count FROM page_views WHERE 1=1 ${dateFilter} GROUP BY DATE(created_at) ORDER BY date`).all(),
            env.DB.prepare(`SELECT device_type as device, COUNT(*) as count FROM page_views WHERE device_type IS NOT NULL ${dateFilter} GROUP BY device_type`).all(),
            // Live activity queries
            env.DB.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE path != '/checkout' AND created_at >= ?`).bind(fiveMinsAgo).first(),
            env.DB.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE path = '/checkout' AND created_at >= ?`).bind(fiveMinsAgo).first(),
            env.DB.prepare(`SELECT COUNT(*) as count FROM orders WHERE created_at >= ?`).bind(fiveMinsAgo).first(),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalPageViews: totalViews?.count || 0,
                uniqueVisitors: uniqueVisitors?.count || 0,
                topCountries: topCountries?.results || [],
                topPages: topPages?.results || [],
                viewsByDay: viewsByDay?.results || [],
                deviceBreakdown: deviceBreakdown?.results || [],
                liveActivity: {
                    activeCarts: activeCarts?.count || 0,
                    checkingOut: checkingOut?.count || 0,
                    purchased: purchased?.count || 0,
                }
            },
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
