import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FoxFollows",
  description: "Read our terms of service and conditions of use for FoxFollows services.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: January 2026
        </p>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <h2 className="text-xl font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2 text-muted-foreground">
            By accessing and using FoxFollows.com, you accept and agree to be
            bound by the terms and provisions of this agreement. If you do not
            agree to these terms, please do not use our services.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            2. Description of Services
          </h2>
          <p className="mt-2 text-muted-foreground">
            FoxFollows provides social media growth services including but not
            limited to followers, likes, views, and comments for various social
            media platforms. We act as an intermediary between users and our
            network of service providers.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            3. User Responsibilities
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              You must be at least 18 years old or have parental consent to use
              our services.
            </li>
            <li>
              You are responsible for providing accurate account information.
            </li>
            <li>
              You agree not to use our services for any illegal or unauthorized
              purpose.
            </li>
            <li>
              You understand that we never require your account passwords.
            </li>
            <li>
              You acknowledge that your account must be set to public for
              delivery.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            4. Payment Terms
          </h2>
          <p className="mt-2 text-muted-foreground">
            All payments are processed securely through our payment providers.
            Prices are listed in USD and are subject to change without notice.
            Once payment is confirmed, orders begin processing immediately.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            5. Delivery Policy
          </h2>
          <p className="mt-2 text-muted-foreground">
            We strive to begin delivery within 0-1 hours of payment
            confirmation. Delivery times vary based on order size and current
            demand. We guarantee 100% delivery or a full refund.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            6. Refill Guarantee
          </h2>
          <p className="mt-2 text-muted-foreground">
            We offer a 30-day refill guarantee on most services. If you
            experience a drop in followers/likes within this period, contact our
            support team for a free refill.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            7. Limitation of Liability
          </h2>
          <p className="mt-2 text-muted-foreground">
            FoxFollows is not responsible for any account bans, restrictions, or
            other actions taken by social media platforms. We make no guarantees
            about long-term retention of followers or engagement.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            8. Intellectual Property
          </h2>
          <p className="mt-2 text-muted-foreground">
            All content, trademarks, and intellectual property on this website
            belong to FoxFollows. You may not reproduce, distribute, or create
            derivative works without our express written permission.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            9. Modifications to Terms
          </h2>
          <p className="mt-2 text-muted-foreground">
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to the website. Continued use
            of our services constitutes acceptance of modified terms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            10. Contact Information
          </h2>
          <p className="mt-2 text-muted-foreground">
            For questions about these Terms of Service, please contact us at{" "}
            <a
              href="mailto:support@foxfollows.com"
              className="text-primary hover:underline"
            >
              support@foxfollows.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
