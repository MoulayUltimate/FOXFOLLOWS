import Link from "next/link";
import { platforms } from "@/lib/products";
import { getPlatformIcon } from "@/components/platform-icons";
import { ArrowRight } from "lucide-react";

export function PlatformCards() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Platform
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We support all major social media platforms with premium quality
            services
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/${platform.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
              />
              <div className="relative">
                <div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${platform.color}15` }}
                >
                  <span style={{ color: platform.color }}>
                    {getPlatformIcon(platform.id, "h-7 w-7")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {platform.name}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {platform.services.slice(0, 3).map((service) => (
                    <li key={service.id}>{service.name}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  View Packages
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
