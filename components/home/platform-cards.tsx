import Link from "next/link";
import { platforms } from "@/lib/products";
import { getPlatformIcon } from "@/components/platform-icons";
import { ArrowRight } from "lucide-react";

export function PlatformCards() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Choose Your Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We support all major social media platforms with premium quality services
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/${platform.id}`}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:-translate-y-1"
            >
              {/* Hover Background Gradient */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                style={{
                  background: `linear-gradient(135deg, ${platform.color}08 0%, ${platform.color}15 100%)`
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${platform.color}15` }}
                >
                  <span style={{ color: platform.color }}>
                    {getPlatformIcon(platform.id, "h-8 w-8")}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {platform.name}
                </h3>

                <ul className="space-y-2 mb-8 flex-grow">
                  {platform.services.slice(0, 3).map((service) => (
                    <li key={service.id} className="text-muted-foreground font-medium">
                      {service.name}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-sm font-bold mt-auto" style={{ color: '#FF7A59' }}>
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
