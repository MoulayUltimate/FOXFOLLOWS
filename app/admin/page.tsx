"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/admin/stats-card";
import { PageViewsChart, TopCountriesList } from "@/components/admin/analytics-charts";
import {
    ShoppingCart,
    DollarSign,
    MessageSquare,
    Users,
    Clock,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardData {
    orders: {
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        totalRevenue: number;
        todayRevenue: number;
    };
    messages: {
        totalMessages: number;
        unreadMessages: number;
    };
    analytics: {
        totalPageViews: number;
        uniqueVisitors: number;
        viewsByDay: { date: string; count: number }[];
        topCountries: { country: string; count: number }[];
    };
}

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    const fetchData = async () => {
        try {
            // Check auth
            const authRes = await fetch("/api/admin/auth");
            if (!authRes.ok) {
                router.push("/admin/login");
                return;
            }

            // Fetch all data in parallel
            const [ordersRes, messagesRes, analyticsRes] = await Promise.all([
                fetch("/api/admin/orders"),
                fetch("/api/admin/messages"),
                fetch("/api/admin/analytics"),
            ]);

            const orders = await ordersRes.json();
            const messages = await messagesRes.json();
            const analytics = await analyticsRes.json();

            setData({
                orders: orders.summary,
                messages: messages.summary,
                analytics: analytics.data,
            });
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [router]);

    const handleSeed = async () => {
        try {
            setSeeding(true);
            const res = await fetch("/api/admin/seed");
            if (!res.ok) throw new Error("Failed to seed data");

            const result = await res.json();
            if (result.success) {
                // Also trigger product seeding
                await fetch("/api/admin/products");

                // Refresh data
                await fetchData();
                // Show success message (using alert for now as toast isn't imported)
                alert("Data seeded successfully!");
            }
        } catch (error) {
            console.error("Seed error:", error);
            alert("Failed to seed data");
        } finally {
            setSeeding(false);
        }
    };

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
                Failed to load dashboard data
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back! Here's an overview of your business.
                    </p>
                </div>
                <Button onClick={handleSeed} disabled={seeding}>
                    {seeding ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Seeding...
                        </>
                    ) : (
                        "Seed Sample Data"
                    )}
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Orders"
                    value={data.orders.totalOrders}
                    icon={<ShoppingCart className="h-5 w-5" />}
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Total Revenue"
                    value={`$${data.orders.totalRevenue.toFixed(2)}`}
                    icon={<DollarSign className="h-5 w-5" />}
                    trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                    title="Pending Orders"
                    value={data.orders.pendingOrders}
                    icon={<Clock className="h-5 w-5" />}
                />
                <StatsCard
                    title="Unread Messages"
                    value={data.messages.unreadMessages}
                    icon={<MessageSquare className="h-5 w-5" />}
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Page Views"
                    value={data.analytics.totalPageViews.toLocaleString()}
                    icon={<TrendingUp className="h-5 w-5" />}
                />
                <StatsCard
                    title="Unique Visitors"
                    value={data.analytics.uniqueVisitors.toLocaleString()}
                    icon={<Users className="h-5 w-5" />}
                />
                <StatsCard
                    title="Today's Revenue"
                    value={`$${data.orders.todayRevenue.toFixed(2)}`}
                    icon={<DollarSign className="h-5 w-5" />}
                    trend={{ value: 5, isPositive: true }}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <PageViewsChart data={data.analytics.viewsByDay} />
                <TopCountriesList data={data.analytics.topCountries} />
            </div>
        </div>
    );
}
