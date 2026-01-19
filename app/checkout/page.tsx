import { Metadata } from "next";
import { CheckoutContent } from "@/components/checkout/checkout-content";

export const metadata: Metadata = {
  title: "Checkout | FoxFollows",
  description: "Complete your order securely with FoxFollows.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
