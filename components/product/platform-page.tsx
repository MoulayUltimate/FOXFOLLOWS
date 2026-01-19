"use client";

import { PackageSelector } from "@/components/product/package-selector";
import { InfoSections } from "@/components/product/info-sections";
import { ReviewsSection } from "@/components/product/reviews-section";
import { getPlatformIcon } from "@/components/platform-icons";
import type { Platform } from "@/lib/products";
import { getPlatformContent } from "@/lib/platform-content";
import { Star, Users, Zap, ShieldCheck } from "lucide-react";

interface PlatformPageProps {
  platform: Platform;
  initialService?: string;
  initialUsername?: string;
}

export function PlatformPage({
  platform,
  initialService,
  initialUsername,
}: PlatformPageProps) {
  const content = getPlatformContent(platform.id);

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden py-12 sm:py-16"
        style={{
          background: `linear-gradient(135deg, ${platform.color}15 0%, transparent 50%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <span style={{ color: platform.color }}>
                {getPlatformIcon(platform.id, "h-8 w-8")}
              </span>
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {content?.heroTitle || `Buy ${platform.name} ${platform.services[0].name}`}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              {content?.heroSubtitle ||
                `Grow your ${platform.name} presence with real, high-quality ${platform.services.map((s) => s.name.toLowerCase()).join(", ")}. Fast delivery, secure payments, and 24/7 support.`}
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm sm:gap-6">
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">4.9/5</span>
                <span className="text-muted-foreground">(12,450+ reviews)</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Users className="h-5 w-5" style={{ color: platform.color }} />
                <span className="font-medium text-foreground">100K+</span>
                <span className="text-muted-foreground">Customers</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Instant</span>
                <span className="text-muted-foreground">Delivery</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium text-foreground">Safe</span>
                <span className="text-muted-foreground">& Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selector */}
      <section className="py-12" id="packages">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <PackageSelector
            platform={platform}
            initialService={initialService}
            initialUsername={initialUsername}
          />
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection platformName={platform.name} />

      {/* Information Sections */}
      {content && <InfoSections content={content} serviceName={platform.services[0].name} />}
    </>
  );
}
