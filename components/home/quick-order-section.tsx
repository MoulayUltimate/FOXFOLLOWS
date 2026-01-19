"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { platforms } from "@/lib/products";
import { getPlatformIcon } from "@/components/platform-icons";
import { Star, CheckCircle2 } from "lucide-react";
import { ApplePayLogo } from "@/components/ui/apple-pay-logo";
import Link from "next/link";

const recentActivity = [
    { text: "1K likes delivered", time: "19 mins ago" },
    { text: "500 followers delivered", time: "2 mins ago" },
    { text: "10K views delivered", time: "5 mins ago" },
    { text: "2.5K likes delivered", time: "12 mins ago" },
    { text: "100 comments delivered", time: "1 hour ago" },
    { text: "5K followers delivered", time: "30 mins ago" },
];

export function QuickOrderSection() {
    const [activePlatform, setActivePlatform] = useState(platforms[0].id);
    const [activityIndex, setActivityIndex] = useState(0);

    const currentPlatform = platforms.find((p) => p.id === activePlatform) || platforms[0];

    useEffect(() => {
        const interval = setInterval(() => {
            setActivityIndex((prev) => (prev + 1) % recentActivity.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                    {/* Platform Tabs */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-slate-50/50 border-b border-slate-100 p-2 md:p-4 gap-2">
                        {platforms.map((platform) => {
                            const isActive = activePlatform === platform.id;
                            return (
                                <button
                                    key={platform.id}
                                    onClick={() => setActivePlatform(platform.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 flex-1 md:flex-none justify-center md:justify-start ${isActive
                                        ? "bg-white shadow-md ring-1 ring-black/5 scale-105 z-10"
                                        : "hover:bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-white" : "bg-transparent"
                                            }`}
                                        style={{ color: platform.color }}
                                    >
                                        {getPlatformIcon(platform.id, "w-6 h-6")}
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-bold text-sm ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                                            {platform.name} Services
                                            {platform.id === "youtube" && (
                                                <span className="ml-2 inline-block px-1.5 py-0.5 bg-[#FF7A59] text-white text-[10px] font-bold rounded-full">NEW</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                            <Star className="w-3 h-3 fill-green-500 text-green-500" />
                                            <span>5.0</span>
                                            <span className="bg-slate-200/50 px-1.5 rounded text-[10px]">
                                                {platform.id === "instagram" ? "3450+" : platform.id === "tiktok" ? "2720+" : "1560+"}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Service Buttons Grid */}
                    <div className="p-8 md:p-12 bg-white">
                        <motion.div
                            key={activePlatform}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 gap-4 md:gap-6"
                        >
                            {currentPlatform.services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/${activePlatform}?service=${service.id}`}
                                    className="group relative overflow-hidden"
                                >
                                    <div className="relative bg-gradient-to-r from-[#FF9A7A] to-[#FF5E4D] hover:from-[#FF8F6D] hover:to-[#FF5342] text-white font-bold text-sm py-3.5 px-4 rounded-xl text-center uppercase tracking-wide shadow-md shadow-orange-500/20 transition-all border-b-4 border-[#E04F3F] active:border-b-0 active:translate-y-1">
                                        Buy {currentPlatform.name} {service.name}
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    </div>

                    {/* Footer / Ticker */}
                    <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

                        {/* Rating */}
                        <div className="flex items-center gap-1 order-2 md:order-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-[#00C68A] rounded p-1">
                                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                                </div>
                            ))}
                            <div className="w-px h-8 bg-slate-200 mx-4 hidden md:block"></div>
                        </div>

                        {/* Live Ticker */}
                        <div className="flex-1 flex items-center justify-center bg-[#E0F7EF] text-[#00875F] px-4 py-2 rounded-lg gap-3 w-full md:w-auto min-w-0 md:min-w-[300px] order-1 md:order-2">
                            <div className="w-2 h-2 rounded-full bg-[#00C68A] animate-pulse shrink-0" />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activityIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    <span className="font-bold">{recentActivity[activityIndex].text}</span>
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span className="opacity-75 text-xs">{recentActivity[activityIndex].time}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-4 order-3">
                            <div className="w-px h-8 bg-slate-200 mx-4 hidden md:block"></div>
                            <div className="flex items-center gap-2 text-slate-600 font-semibold border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                                <span className="text-xs font-medium mr-1">Pay with</span>
                                <ApplePayLogo className="h-8 w-auto" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
