import { Suspense } from "react";


import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatform } from "@/lib/products";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Buy YouTube Subscribers, Views & Likes | FoxFollows",
  description:
    "Buy real YouTube subscribers, views and likes. Safe for monetization, instant delivery, and lifetime guarantee. Grow your YouTube channel today!",
  keywords:
    "buy youtube subscribers, buy youtube views, buy youtube likes, youtube growth",
};

export default function YouTubePage() {
  const platform = getPlatform("youtube");
  if (!platform) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PlatformPage
        platform={platform}
      />
    </Suspense>
  );
}
