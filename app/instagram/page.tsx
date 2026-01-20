import { Suspense } from "react";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatformFromDB } from "@/lib/products-db";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Buy Instagram Followers, Likes & Views | FoxFollows",
  description:
    "Buy real Instagram followers, likes, views and comments. Instant delivery, 24/7 support, and refill guarantee. Grow your Instagram today!",
  keywords:
    "buy instagram followers, buy instagram likes, buy instagram views, instagram growth",
};

export default async function InstagramPage() {
  const env = getRequestContext().env as any;
  let platform;

  if (env?.DB) {
    platform = await getPlatformFromDB("instagram", env.DB);
  } else {
    // Fallback for build time / static generation where DB might not be available
    const { getPlatform } = await import("@/lib/products");
    platform = getPlatform("instagram");
  }

  if (!platform) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PlatformPage
        platform={platform}
      />
    </Suspense>
  );
}
