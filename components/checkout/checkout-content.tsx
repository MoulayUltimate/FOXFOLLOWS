"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatQuantity } from "@/lib/products";
import { FoxLogo } from "@/components/fox-logo";
import { toast } from "sonner";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Lock,
  Shield,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { StripeProvider } from "./stripe-provider";

export function CheckoutContent() {
  const { items, removeItem, total, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);



  if (orderComplete) {
    return (
      <div className="min-h-[60vh] py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for your order! We&apos;ve sent a confirmation email to{" "}
            <span className="font-medium text-foreground">{email}</span>. Your
            order will start processing within the next few minutes.
          </p>
          <div className="mt-8 space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Your Cart is Empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Cart Items & Payment */}
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <ShoppingCart className="h-5 w-5" />
                Order Items ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between rounded-lg bg-secondary/50 p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {item.platform}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {item.service}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatQuantity(item.quantity)} {item.service}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.username}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Contact Information
              </h2>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  We&apos;ll send order confirmation and updates to this email
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h2>
              {email ? (
                <StripeProvider
                  email={email}
                  onSuccess={() => {
                    setOrderComplete(true);
                    clearCart();
                  }}
                />
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Please enter your email address above to proceed with payment.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-border pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatQuantity(item.quantity)} {item.platform}{" "}
                      {item.service}
                    </span>
                    <span className="text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-b border-border py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="text-green-500">FREE</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>



              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 border-t border-border pt-6">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock className="h-4 w-4 text-blue-500" />
                  SSL Encrypted
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-4 rounded-lg bg-green-500/10 p-4 text-center">
                <p className="text-sm font-medium text-green-700">
                  100% Money Back Guarantee
                </p>
                <p className="mt-1 text-xs text-green-600">
                  If we don&apos;t deliver, you get a full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
