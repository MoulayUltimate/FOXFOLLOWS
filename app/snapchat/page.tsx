import { Suspense } from "react";

export const runtime = "edge";
import { Metadata } from "next";
import { PlatformPage } from "@/components/product/platform-page";
import { getPlatform } from "@/lib/products";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Buy Snapchat Followers & Story Views | FoxFollows",
  description:
    "Buy real Snapchat followers and story views. Fast delivery, secure payments, and 24/7 support. Grow your Snapchat today!",
  keywords:
    "buy snapchat followers, buy snapchat views, snapchat growth",
};

interface PageProps {
  searchParams: Promise<{ service?: string; username?: string }>;
}

export default async function SnapchatPage({ searchParams }: PageProps) {
  const platform = getPlatform("snapchat");
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
