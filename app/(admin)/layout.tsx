import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Admin Panel | FoxFollows",
    description: "FoxFollows Admin Dashboard",
    robots: "noindex, nofollow",
};

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
