"use client";

import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface CheckoutFormProps {
    amount: number;
    onSuccess: () => void;
}

export function CheckoutForm({ amount, onSuccess }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
            redirect: "if_required",
        });

        if (error) {
            setErrorMessage(error.message || "An unexpected error occurred.");
            setIsProcessing(false);
        } else {
            // Payment successful
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {errorMessage && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {errorMessage}
                </div>
            )}

            <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full gap-2"
                size="lg"
            >
                {isProcessing ? (
                    "Processing..."
                ) : (
                    <>
                        <Lock className="h-4 w-4" />
                        Pay ${amount.toFixed(2)}
                    </>
                )}
            </Button>
        </form>
    );
}
