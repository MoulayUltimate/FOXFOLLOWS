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

export default function TikTokPage() {
  const platform = getPlatform("tiktok");
  if (!platform) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PlatformPage
        platform={platform}
      />
    </Suspense>
  );
}
