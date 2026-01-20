import { Suspense } from "react";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatformFromDB } from "@/lib/products-db";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Buy TikTok Followers, Likes & Views | FoxFollows",
  description:
    "Buy real TikTok followers, likes and views. Go viral faster with instant delivery and 24/7 support. Grow your TikTok today!",
  keywords:
    "buy tiktok followers, buy tiktok likes, buy tiktok views, tiktok growth",
};

export default async function TikTokPage() {
  const env = getRequestContext().env as any;
  let platform;

  if (env?.DB) {
    platform = await getPlatformFromDB("tiktok", env.DB);
  } else {
    const { getPlatform } = await import("@/lib/products");
    platform = getPlatform("tiktok");
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
