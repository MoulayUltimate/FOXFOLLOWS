import React from "react"
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";

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
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '850291097771553');
fbq('track', 'PageView');
`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=850291097771553&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
