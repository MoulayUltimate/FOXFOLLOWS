"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronDown, Star } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { motion } from "framer-motion";

interface InfoCard {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface ServiceInfoSectionProps {
    title: string;
    rating: number;
    reviewCount: string;
    benefits: string[];
    ctaText: string;
    infoCards: InfoCard[];
    reversed?: boolean;
}

export function ServiceInfoSection({
    title,
    rating,
    reviewCount,
    benefits,
    ctaText,
    infoCards,
    reversed = false,
}: ServiceInfoSectionProps) {
    // Parse review count string to number for animation (e.g. "10,450+" -> 10450)
    const reviewCountNum = parseInt(reviewCount.replace(/[^0-9]/g, "")) || 0;
    const reviewCountSuffix = reviewCount.replace(/[0-9,]/g, "");

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`rounded-[2.5rem] bg-gradient-to-br from-orange-50 via-white to-blue-50 p-8 md:p-12 lg:p-16 border border-white/50 shadow-sm`}
                >
                    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reversed ? 'direction-rtl' : ''}`}>

                        {/* Info Cards Column */}
                        <div className={`grid sm:grid-cols-2 gap-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                            {infoCards.map((card, index) => {
                                const [isExpanded, setIsExpanded] = useState(false);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card
                                            className="relative p-6 pt-8 border-0 shadow-sm bg-white rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300 h-full cursor-pointer"
                                            onClick={() => setIsExpanded(!isExpanded)}
                                        >
                                            <div className="flex flex-col items-center text-center space-y-4">
                                                {/* Icon/Illustration Placeholder */}
                                                <div className="mb-2 relative">
                                                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 scale-150"></div>
                                                    <motion.div
                                                        className="relative text-[#FF7A59]"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        {card.icon}
                                                    </motion.div>
                                                </div>

                                                <h3 className="text-lg font-bold text-slate-900 leading-tight px-2">
                                                    {card.title}
                                                </h3>

                                                <div className="relative">
                                                    <p className={`text-sm text-slate-600 leading-relaxed transition-all duration-300 ${isExpanded ? 'line-clamp-none' : 'line-clamp-[8] group-hover:line-clamp-none'}`}>
                                                        {card.description}
                                                    </p>
                                                    <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}></div>
                                                </div>

                                                <div className="pt-2 mt-auto">
                                                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-all duration-300 ${isExpanded ? 'bg-[#FF7A59] text-white rotate-180' : 'group-hover:bg-[#FF7A59] group-hover:text-white'}`}>
                                                        <ChevronDown className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Main Content Column */}
                        <div className={`space-y-6 ${reversed ? 'lg:order-1' : 'lg:order-2'} pt-4 flex flex-col items-center lg:items-start text-center lg:text-left`}>
                            {/* Rating Badge */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-100 shadow-sm">
                                    <Star className="w-3.5 h-3.5 fill-green-500 text-green-500" />
                                    <span className="font-bold text-xs text-slate-900">
                                        <CountUp value={rating} decimals={1} duration={1.5} />
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-slate-500 bg-slate-200/50 px-2 py-1 rounded-md">
                                    <CountUp value={reviewCountNum} duration={2} suffix={reviewCountSuffix} />
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                {title}
                            </h2>

                            <ul className="space-y-3 w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
                                {benefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-3 justify-center lg:justify-start text-left"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div className="mt-0.5 shrink-0 rounded-full bg-orange-100 p-0.5">
                                            <Check className="w-3 h-3 text-[#FF7A59] stroke-[4]" />
                                        </div>
                                        <span className="text-base text-slate-600 font-medium">
                                            {benefit}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="pt-6 w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto px-10 py-6 text-base font-bold bg-[#FF7A59] hover:bg-[#ff6a45] text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 rounded-xl uppercase tracking-wide"
                                >
                                    {ctaText}
                                </Button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
