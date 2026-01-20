"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkout-form";
import { useCart } from "@/components/cart-provider";
import { Loader2 } from "lucide-react";

// Initialize Stripe outside of component to avoid recreating it
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
    email: string;
    onSuccess: (orderIds: string[]) => void;
}

export function StripeProvider({ email, onSuccess }: StripeProviderProps) {
    const { items, total } = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [orderIds, setOrderIds] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items, email }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setClientSecret(data.clientSecret);
                    setOrderIds(data.orderIds || []);
                    setError("");
                }
            })
            .catch((err) => {
                console.error("Error fetching payment intent:", err);
                setError("Failed to initialize payment");
            });
    }, [items, email]);

    if (error) {
        return (
            <div className="rounded-lg bg-destructive/10 p-4 text-center text-destructive">
                <p>{error}</p>
                <p className="text-sm mt-2">Please try refreshing the page.</p>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#f97316', // Orange-500
                    },
                },
            }}
        >
            <CheckoutForm amount={total} onSuccess={() => onSuccess(orderIds)} />
        </Elements>
    );
}
