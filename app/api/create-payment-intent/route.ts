import { NextResponse } from "next/server";
import Stripe from "stripe";
import { platforms } from "@/lib/products";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { generateOrderId } from "@/lib/db";

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { items, email } = await req.json();
        const env = getRequestContext().env as any;

        if (!env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing from environment variables");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
            apiVersion: "2025-02-24.acacia",
        });

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "No items in cart" },
                { status: 400 }
            );
        }

        // Calculate total amount on server side to prevent tampering
        let totalAmount = 0;

        for (const item of items) {
            const platform = platforms.find(p => p.id === item.platformId);
            if (!platform) continue;

            const service = platform.services.find(s => s.id === item.serviceId);
            if (!service) continue;

            const pkg = service.packages.find(p => p.id === item.packageId);
            if (!pkg) continue;

            totalAmount += pkg.price * (item.quantity || 1);
        }

        // Create Pending Orders in DB
        const orderIds: string[] = [];
        if (env.DB) {
            const stmt = env.DB.prepare(`
                INSERT INTO orders (id, platform, service, quantity, price, username, email, payment_status, delivery_status, country)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
            const batch = [];
            const country = req.headers.get('cf-ipcountry') || 'Unknown';

            for (const item of items) {
                const orderId = generateOrderId();
                orderIds.push(orderId);

                batch.push(stmt.bind(
                    orderId,
                    item.platform,
                    item.service,
                    item.quantity,
                    item.price,
                    item.username,
                    email,
                    'pending', // Payment status pending
                    'pending', // Delivery status pending
                    country
                ));
            }
            await env.DB.batch(batch);
        } else {
            // Fallback for dev/build without DB binding (though this shouldn't happen in prod)
            console.warn("DB binding not found, skipping order creation");
            // Generate fake IDs for UI if DB is missing (e.g. local dev without miniflare)
            for (const item of items) {
                orderIds.push(generateOrderId());
            }
        }

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
            currency: "usd",
            receipt_email: email,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                email,
                itemCount: items.length,
                orderIds: orderIds.join(','), // Store order IDs in metadata
            },
        });

        // Update orders with Stripe Payment ID
        if (env.DB && orderIds.length > 0) {
            try {
                const placeholders = orderIds.map(() => '?').join(',');
                await env.DB.prepare(`
                    UPDATE orders 
                    SET stripe_payment_id = ? 
                    WHERE id IN (${placeholders})
                `).bind(paymentIntent.id, ...orderIds).run();
            } catch (dbError) {
                console.error("Failed to update order with payment ID (likely missing column):", dbError);
                // Continue without failing the request, as payment intent is valid
            }
        }

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            orderIds: orderIds, // Return IDs to client
        });
    } catch (error: any) {
        console.error("Stripe/Order error:", error);
        return NextResponse.json(
            { error: error.message || "Error creating payment intent" },
            { status: 500 }
        );
    }
}
