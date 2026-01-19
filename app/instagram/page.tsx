import { Suspense } from "react";


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

export default function InstagramPage() {
  const platform = getPlatform("instagram");
  if (!platform) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PlatformPage
        platform={platform}
      />
    </Suspense>
  );
}
