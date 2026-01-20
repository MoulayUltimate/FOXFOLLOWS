import { NextResponse } from "next/server";
import Stripe from "stripe";
import { platforms } from "@/lib/products";
import { getRequestContext } from "@cloudflare/next-on-pages";

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
            apiVersion: "2025-01-27.acacia",
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
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: "Error creating payment intent" },
            { status: 500 }
        );
    }
}
