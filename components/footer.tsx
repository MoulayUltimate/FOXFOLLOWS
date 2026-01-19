import Link from "next/link";
import { FoxLogo } from "@/components/fox-logo";
import { PaymentMethods } from "@/components/payment-methods";

const platformLinks = [
  { name: "Instagram Followers", href: "/instagram" },
  { name: "Instagram Likes", href: "/instagram?service=likes" },
  { name: "YouTube Subscribers", href: "/youtube" },
  { name: "TikTok Followers", href: "/tiktok" },
  { name: "Snapchat Followers", href: "/snapchat" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund Policy", href: "/refund" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <FoxLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">
                Fox<span className="text-primary">Follows</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The #1 trusted source for growing your social media presence.
              Fast delivery, real results, and 24/7 support.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <PaymentMethods />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FoxFollows.com. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              FoxFollows is not affiliated with Instagram, YouTube, TikTok, or Snapchat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
