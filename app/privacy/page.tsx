import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FoxFollows",
  description: "Learn how FoxFollows collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: January 2026
        </p>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <h2 className="text-xl font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p className="mt-2 text-muted-foreground">
            We collect information you provide directly to us, including:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Email address for order confirmations and support</li>
            <li>Social media usernames or URLs for service delivery</li>
            <li>Payment information (processed securely by our payment providers)</li>
            <li>Communication records when you contact our support team</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p className="mt-2 text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Process and deliver your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our services and website experience</li>
            <li>Prevent fraudulent transactions and protect against abuse</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            3. Information Sharing
          </h2>
          <p className="mt-2 text-muted-foreground">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information only in the following
            circumstances:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>With service providers who assist in delivering our services</li>
            <li>When required by law or to protect our legal rights</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            4. Data Security
          </h2>
          <p className="mt-2 text-muted-foreground">
            We implement industry-standard security measures to protect your
            personal information. All payment transactions are encrypted using
            SSL technology. We never store complete credit card information on
            our servers.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            5. Cookies and Tracking
          </h2>
          <p className="mt-2 text-muted-foreground">
            We use cookies and similar technologies to improve your browsing
            experience, analyze website traffic, and understand user behavior.
            You can control cookies through your browser settings.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            6. Your Rights
          </h2>
          <p className="mt-2 text-muted-foreground">
            You have the right to:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            7. Data Retention
          </h2>
          <p className="mt-2 text-muted-foreground">
            We retain your personal information only as long as necessary to
            fulfill the purposes for which it was collected, including to
            satisfy legal, accounting, or reporting requirements.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            8. Children&apos;s Privacy
          </h2>
          <p className="mt-2 text-muted-foreground">
            Our services are not intended for individuals under 18 years of age.
            We do not knowingly collect personal information from children.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            9. Changes to This Policy
          </h2>
          <p className="mt-2 text-muted-foreground">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &ldquo;Last updated&rdquo; date.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            10. Contact Us
          </h2>
          <p className="mt-2 text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:privacy@foxfollows.com"
              className="text-primary hover:underline"
            >
              privacy@foxfollows.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
