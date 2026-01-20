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
            // Try ID match first, then fallback to name match (for legacy carts)
            let platform = platforms.find(p => p.id === item.platformId);
            if (!platform) {
                platform = platforms.find(p => p.name === item.platform);
            }
            if (!platform) continue;

            let service = platform.services.find(s => s.id === item.serviceId);
            if (!service) {
                service = platform.services.find(s => s.name === item.service);
            }
            if (!service) continue;

            let pkg = service.packages.find(p => p.id === item.packageId);
            if (!pkg) {
                // Try to match by price and quantity if package ID is missing
                pkg = service.packages.find(p => p.price === item.price && p.quantity === item.quantity);
            }
            if (!pkg) continue;

            // Calculate number of packages (item.quantity is the total volume, e.g. 1000 followers)
            // If item.quantity is 2000 and pkg.quantity is 1000, then count is 2.
            const count = pkg.quantity > 0 ? (item.quantity / pkg.quantity) : 1;
            totalAmount += pkg.price * count;
        }

        // Safeguard against massive totals
        if (totalAmount > 10000) {
            return NextResponse.json(
                { error: "Order total exceeds limit ($10,000). Please contact support." },
                { status: 400 }
            );
        }

        if (totalAmount < 0.50) {
            return NextResponse.json(
                { error: "Order total must be at least $0.50" },
                { status: 400 }
            );
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
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error("Stripe/Order error:", error);
        return NextResponse.json(
            { error: error.message || "Error creating payment intent" },
            { status: 500 }
        );
    }
}
