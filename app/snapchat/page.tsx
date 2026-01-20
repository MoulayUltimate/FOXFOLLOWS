import { Suspense } from "react";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatformFromDB } from "@/lib/products-db";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Buy Snapchat Followers & Story Views | FoxFollows",
  description:
    "Buy real Snapchat followers and story views. Fast delivery, secure payments, and 24/7 support. Grow your Snapchat today!",
  keywords:
    "buy snapchat followers, buy snapchat views, snapchat growth",
};

export default async function SnapchatPage() {
  const env = getRequestContext().env as any;
  let platform;

  if (env?.DB) {
    platform = await getPlatformFromDB("snapchat", env.DB);
  } else {
    const { getPlatform } = await import("@/lib/products");
    platform = getPlatform("snapchat");
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
