"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
    const pathname = usePathname();
    const lastPathname = useRef<string>("");

    useEffect(() => {
        // Skip if same pathname (e.g., hash changes)
        if (pathname === lastPathname.current) return;
        lastPathname.current = pathname;

        // Track page view
        const trackPageView = async () => {
            try {
                await fetch("/api/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: pathname,
                        referrer: document.referrer || null,
                    }),
                });
            } catch (error) {
                // Silently fail - analytics shouldn't break the app
                console.debug("Analytics tracking failed:", error);
            }
        };

        // Small delay to not block page rendering
        const timeoutId = setTimeout(trackPageView, 100);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    // This component doesn't render anything
    return null;
}
