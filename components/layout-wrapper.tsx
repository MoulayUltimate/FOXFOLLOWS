"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { Toaster } from "@/components/ui/sonner";
import { SalesPopup } from "@/components/ui/sales-popup";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { ChatWidget } from "@/components/chat-widget";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        // Admin routes - no header/footer
        return (
            <CartProvider>
                {children}
                <Toaster />
            </CartProvider>
        );
    }

    // Normal routes - with header/footer
    return (
        <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
            <SalesPopup />
            <AnalyticsTracker />
            <ChatWidget />
        </CartProvider>
    );
}
