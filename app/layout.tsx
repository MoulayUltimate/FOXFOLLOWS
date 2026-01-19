import React from "react"
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { Toaster } from "@/components/ui/sonner";
import { SalesPopup } from "@/components/ui/sales-popup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "FoxFollows - Buy Instagram, YouTube, TikTok & Snapchat Followers",
  description:
    "FoxFollows is the #1 trusted source to buy real social media followers, likes, comments and views. Fast delivery, 24/7 support, and secure payments.",
  keywords:
    "buy instagram followers, buy youtube subscribers, buy tiktok followers, buy snapchat followers, social media growth",
  openGraph: {
    title: "FoxFollows - Grow Your Social Media Presence",
    description:
      "Buy real followers, likes, comments and views for Instagram, YouTube, TikTok & Snapchat",
    url: "https://foxfollows.com",
    siteName: "FoxFollows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoxFollows - Buy Social Media Followers",
    description:
      "The #1 trusted source for real social media growth services",
  },
  generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
          <SalesPopup />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
