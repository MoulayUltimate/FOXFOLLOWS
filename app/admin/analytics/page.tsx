"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/admin/stats-card";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { AnalyticsSummary } from "@/lib/db";
import { Eye, Users, Globe, Monitor } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AdminAnalyticsPage() {
    const router = useRouter();
    const [data, setData] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState<string>("7d");

    const fetchAnalytics = async (timePeriod: string) => {
        try {
            const res = await fetch(`/api/admin/analytics?period=${timePeriod}`);
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/admin/login");
                    return;
                }
                throw new Error("Failed to fetch analytics");
            }

            const result = await res.json();
            setData(result.data);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
            toast.error("Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics(period);
    }, [period, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Failed to load analytics
            </div>
        );
    }

    // Calculate total devices
    const totalDevices = data.deviceBreakdown.reduce((sum, d) => sum + d.count, 0);
    const mobilePercent = totalDevices > 0
        ? Math.round((data.deviceBreakdown.find(d => d.device === 'mobile')?.count || 0) / totalDevices * 100)
        : 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground mt-1">
                        Track visitor activity and behavior
                    </p>
                </div>
                <div className="flex gap-2">
                    {[
                        { value: "7d", label: "7 Days" },
                        { value: "30d", label: "30 Days" },
                        { value: "all", label: "All Time" },
                    ].map((option) => (
                        <Button
                            key={option.value}
                            variant={period === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPeriod(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Page Views"
                    value={data.totalPageViews.toLocaleString()}
                    icon={<Eye className="h-5 w-5" />}
                />
                <StatsCard
                    title="Unique Visitors"
                    value={data.uniqueVisitors.toLocaleString()}
                    icon={<Users className="h-5 w-5" />}
                />
                <StatsCard
                    title="Countries"
                    value={data.topCountries.length}
                    icon={<Globe className="h-5 w-5" />}
                />
                <StatsCard
                    title="Mobile Traffic"
                    value={`${mobilePercent}%`}
                    icon={<Monitor className="h-5 w-5" />}
                />
            </div>

            {/* Charts */}
            <AnalyticsCharts data={data} />
        </div>
    );
}
