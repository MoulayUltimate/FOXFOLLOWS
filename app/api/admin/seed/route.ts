import { NextRequest, NextResponse } from 'next/server';
import { generateOrderId } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ error: 'Database binding not found' }, { status: 500 });
        }

        // Sample data arrays
        const platforms = ['Instagram', 'TikTok', 'YouTube', 'Snapchat'];
        const services = ['Followers', 'Likes', 'Views', 'Comments', 'Subscribers'];
        const statuses = ['completed', 'pending', 'processing', 'failed'];
        const countries = ['US', 'UK', 'DE', 'FR', 'CA', 'AU', 'BR', 'IN'];
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson', 'Emma Brown', 'Michael Davis'];

        const batch = [];

        // 1. Seed Orders (50 orders)
        for (let i = 0; i < 50; i++) {
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const service = services[Math.floor(Math.random() * services.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            const price = (Math.random() * 100) + 5;

            // Random date within last 30 days
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            const createdAt = date.toISOString();

            batch.push(env.DB.prepare(`
                INSERT INTO orders (id, platform, service, quantity, price, username, email, payment_status, delivery_status, country, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
                generateOrderId(),
                platform,
                service,
                Math.floor(Math.random() * 10000) + 100,
                price,
                `@user_${Math.floor(Math.random() * 1000)}`,
                `user${i}@example.com`,
                status,
                status === 'completed' ? 'completed' : (status === 'processing' ? 'processing' : 'pending'),
                country,
                createdAt
            ));
        }

        // 2. Seed Messages (20 messages)
        for (let i = 0; i < 20; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const isRead = Math.random() > 0.5 ? 1 : 0;
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 14));

            batch.push(env.DB.prepare(`
                INSERT INTO contact_messages (name, email, subject, message, is_read, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
            `).bind(
                name,
                `${name.toLowerCase().replace(' ', '.')}@example.com`,
                ['Order Issue', 'Refund Request', 'General Inquiry', 'Partnership'][Math.floor(Math.random() * 4)],
                'This is a sample message for testing purposes.',
                isRead,
                date.toISOString()
            ));
        }

        // 3. Seed Page Views (500 views)
        const pages = ['/', '/instagram', '/tiktok', '/youtube', '/checkout', '/contact'];
        for (let i = 0; i < 500; i++) {
            const path = pages[Math.floor(Math.random() * pages.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            const device = ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)];
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 7)); // Last 7 days heavily

            batch.push(env.DB.prepare(`
                INSERT INTO page_views (path, country, device_type, session_id, created_at)
                VALUES (?, ?, ?, ?, ?)
            `).bind(
                path,
                country,
                device,
                `sess_${Math.floor(Math.random() * 1000)}`,
                date.toISOString()
            ));
        }

        // Execute in chunks of 50 to avoid limits
        const chunkSize = 50;
        for (let i = 0; i < batch.length; i += chunkSize) {
            await env.DB.batch(batch.slice(i, i + chunkSize));
        }

        return NextResponse.json({
            success: true,
            message: `Seeded ${batch.length} records successfully`
        });

    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Failed to seed database', details: String(error) }, { status: 500 });
    }
}
