"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";

const NAMES = ["John", "Sarah", "Mike", "Emily", "David", "Jessica", "Alex", "Emma", "Daniel", "Olivia", "James", "Sophia"];
const LOCATIONS = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Brazil"];
const PRODUCTS = [
    "1k Instagram Followers",
    "500 Instagram Likes",
    "10k TikTok Views",
    "2.5k YouTube Views",
    "100 Snapchat Followers",
    "5k Instagram Views",
    "1k TikTok Followers",
    "50 YouTube Subscribers",
];

interface SaleData {
    name: string;
    location: string;
    product: string;
    timeAgo: string;
}

export function SalesPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [sale, setSale] = useState<SaleData | null>(null);

    useEffect(() => {
        // Initial delay
        const initialTimeout = setTimeout(() => {
            showRandomSale();
        }, 5000);

        return () => clearTimeout(initialTimeout);
    }, []);

    const showRandomSale = () => {
        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

        setSale({
            name,
            location,
            product,
            timeAgo: "Just now"
        });
        setIsVisible(true);

        // Hide after 5 seconds
        setTimeout(() => {
            setIsVisible(false);

            // Show next one after random delay (5-15 seconds)
            const nextDelay = Math.floor(Math.random() * 10000) + 5000;
            setTimeout(showRandomSale, nextDelay);
        }, 5000);
    };

    return (
        <AnimatePresence>
            {isVisible && sale && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-4 right-4 z-50 max-w-sm w-full md:w-auto"
                >
                    <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 flex items-center gap-4 pr-8">
                        <div className="bg-green-100 rounded-full p-2 shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-semibold text-slate-800">
                                {sale.name} from {sale.location}
                            </div>
                            <div className="text-xs text-slate-600">
                                Bought <span className="font-bold text-slate-900">{sale.product}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                                {sale.timeAgo}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
