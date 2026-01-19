import { Suspense } from "react";

export const runtime = "edge";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatform } from "@/lib/products";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Buy Instagram Followers, Likes & Views | FoxFollows",
  description:
    "Buy real Instagram followers, likes, views and comments. Instant delivery, 24/7 support, and refill guarantee. Grow your Instagram today!",
  keywords:
    "buy instagram followers, buy instagram likes, buy instagram views, instagram growth",
};

interface PageProps {
  searchParams: Promise<{ service?: string; username?: string }>;
}

export default async function InstagramPage({ searchParams }: PageProps) {
  const platform = getPlatform("instagram");
  if (!platform) notFound();

  const { service, username } = await searchParams;

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PlatformPage
        platform={platform}
        initialService={service}
        initialUsername={username}
      />
    </Suspense>
  );
}
