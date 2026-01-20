import { Suspense } from "react";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatformFromDB } from "@/lib/products-db";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Buy YouTube Subscribers, Views & Likes | FoxFollows",
  description:
    "Buy real YouTube subscribers, views and likes. Safe for monetization, instant delivery, and lifetime guarantee. Grow your YouTube channel today!",
  keywords:
    "buy youtube subscribers, buy youtube views, buy youtube likes, youtube growth",
};

export default async function YouTubePage() {
  const env = getRequestContext().env as any;
  let platform;

  if (env?.DB) {
    platform = await getPlatformFromDB("youtube", env.DB);
  } else {
    const { getPlatform } = await import("@/lib/products");
    platform = getPlatform("youtube");
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
