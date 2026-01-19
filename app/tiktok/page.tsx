import { Suspense } from "react";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatform } from "@/lib/products";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Buy TikTok Followers, Likes & Views | FoxFollows",
  description:
    "Buy real TikTok followers, likes and views. Go viral faster with instant delivery and 24/7 support. Grow your TikTok today!",
  keywords:
    "buy tiktok followers, buy tiktok likes, buy tiktok views, tiktok growth",
};

interface PageProps {
  searchParams: Promise<{ service?: string; username?: string }>;
}

export default async function TikTokPage({ searchParams }: PageProps) {
  const platform = getPlatform("tiktok");
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
