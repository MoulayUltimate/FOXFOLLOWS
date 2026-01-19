import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | FoxFollows",
  description: "Learn about our refund and money-back guarantee policies at FoxFollows.",
};

export default function RefundPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Refund Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: January 2026
        </p>

        {/* Guarantee Banner */}
        <div className="mt-8 rounded-xl bg-green-500/10 p-6 text-center">
          <h2 className="text-xl font-bold text-green-700">
            100% Money Back Guarantee
          </h2>
          <p className="mt-2 text-green-600">
            We stand behind our services. If we don&apos;t deliver, you get a full
            refund.
          </p>
        </div>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <h2 className="text-xl font-semibold text-foreground">
            1. Our Commitment
          </h2>
          <p className="mt-2 text-muted-foreground">
            At FoxFollows, customer satisfaction is our top priority. We are
            committed to delivering high-quality services and will work with you
            to resolve any issues that may arise.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            2. Full Refund Eligibility
          </h2>
          <p className="mt-2 text-muted-foreground">
            You are eligible for a full refund if:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Your order was not delivered within the promised timeframe
            </li>
            <li>We are unable to process your order due to technical issues</li>
            <li>
              You cancel your order before delivery has started (within 1 hour
              of purchase)
            </li>
            <li>
              The delivered quantity is significantly less than ordered (after
              waiting for full delivery)
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            3. Partial Refund Cases
          </h2>
          <p className="mt-2 text-muted-foreground">
            Partial refunds may be issued when:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Only a portion of your order was delivered</li>
            <li>
              You request cancellation after partial delivery has occurred
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            4. Refill Guarantee (Instead of Refund)
          </h2>
          <p className="mt-2 text-muted-foreground">
            For drops in followers or likes within 30 days of delivery, we offer
            free refills instead of refunds. This ensures you maintain your
            desired count without additional cost.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            5. Non-Refundable Situations
          </h2>
          <p className="mt-2 text-muted-foreground">
            Refunds will not be provided in the following cases:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Your account was set to private, preventing delivery
            </li>
            <li>
              You provided incorrect username or URL information
            </li>
            <li>
              Your account was deleted, suspended, or banned by the platform
            </li>
            <li>
              You changed your username after placing the order
            </li>
            <li>
              The order has been fully delivered as promised
            </li>
            <li>
              More than 30 days have passed since order completion
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            6. How to Request a Refund
          </h2>
          <p className="mt-2 text-muted-foreground">
            To request a refund, please:
          </p>
          <ol className="mt-2 list-decimal space-y-2 pl-6 text-muted-foreground">
            <li>
              Contact our support team at{" "}
              <a
                href="mailto:support@foxfollows.com"
                className="text-primary hover:underline"
              >
                support@foxfollows.com
              </a>
            </li>
            <li>Provide your order ID and email address used for purchase</li>
            <li>Explain the reason for your refund request</li>
            <li>Allow up to 48 hours for our team to review your request</li>
          </ol>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            7. Refund Processing Time
          </h2>
          <p className="mt-2 text-muted-foreground">
            Once approved, refunds are processed within 5-10 business days. The
            time for the refund to appear in your account depends on your
            payment provider and may take an additional 3-5 business days.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            8. Chargebacks
          </h2>
          <p className="mt-2 text-muted-foreground">
            We encourage customers to contact us before filing a chargeback with
            their bank. Filing a chargeback without first attempting to resolve
            the issue with us may result in being banned from future purchases.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            9. Contact Us
          </h2>
          <p className="mt-2 text-muted-foreground">
            Have questions about our refund policy? Contact our support team:
          </p>
          <ul className="mt-2 list-none space-y-1 pl-0 text-muted-foreground">
            <li>
              Email:{" "}
              <a
                href="mailto:support@foxfollows.com"
                className="text-primary hover:underline"
              >
                support@foxfollows.com
              </a>
            </li>
            <li>
              Contact Form:{" "}
              <Link href="/contact" className="text-primary hover:underline">
                foxfollows.com/contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
