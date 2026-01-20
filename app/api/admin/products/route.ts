import { NextRequest, NextResponse } from 'next/server';
import { platforms } from '@/lib/products';

export const runtime = 'edge';

// GET - Fetch all products (seed if empty)
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            // Fallback to static data if no DB
            return NextResponse.json({
                success: true,
                products: platforms.flatMap(p => p.services.flatMap(s => s.packages.map(pkg => ({
                    id: pkg.id,
                    platform: p.id,
                    service: s.id,
                    name: `${p.name} ${s.name} - ${pkg.quantity}`,
                    quantity: pkg.quantity,
                    price: pkg.price,
                    original_price: pkg.originalPrice || null,
                    is_popular: pkg.popular ? 1 : 0,
                    is_best_value: pkg.bestValue ? 1 : 0,
                    active: 1
                }))))
            });
        }

        // Check if products exist
        const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM products').first();

        if (countResult?.count === 0) {
            // Seed database
            const stmt = env.DB.prepare(`
                INSERT INTO products (id, platform, service, name, quantity, price, original_price, is_popular, is_best_value, active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const batch = [];
            for (const p of platforms) {
                for (const s of p.services) {
                    for (const pkg of s.packages) {
                        batch.push(stmt.bind(
                            pkg.id,
                            p.id,
                            s.id,
                            `${p.name} ${s.name} - ${pkg.quantity}`,
                            pkg.quantity,
                            pkg.price,
                            pkg.originalPrice || null,
                            pkg.popular ? 1 : 0,
                            pkg.bestValue ? 1 : 0,
                            1
                        ));
                    }
                }
            }

            // Execute batch insert
            await env.DB.batch(batch);
        }

        // Fetch all products
        const products = await env.DB.prepare('SELECT * FROM products ORDER BY platform, service, quantity').all();

        return NextResponse.json({ success: true, products: products.results });

    } catch (error) {
        console.error('Products fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// PATCH - Update product
export async function PATCH(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, price, active } = body;

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const env = (request as any).env;
        if (!env?.DB) {
            return NextResponse.json({ success: true, updated: false });
        }

        const updates: string[] = [];
        const params: any[] = [];

        if (price !== undefined) {
            updates.push('price = ?');
            params.push(price);
        }
        if (active !== undefined) {
            updates.push('active = ?');
            params.push(active ? 1 : 0);
        }

        if (updates.length === 0) {
            return NextResponse.json({ success: true, updated: false });
        }

        updates.push("updated_at = datetime('now')");
        params.push(id);

        await env.DB.prepare(
            `UPDATE products SET ${updates.join(', ')} WHERE id = ?`
        ).bind(...params).run();

        return NextResponse.json({ success: true, updated: true });

    } catch (error) {
        console.error('Product update error:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}
