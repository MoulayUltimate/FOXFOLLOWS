"use client";

import { useState } from "react";
import { AnalyticsSummary } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ActivityFunnel } from "@/components/admin/activity-funnel";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface AnalyticsChartsProps {
    data: AnalyticsSummary;
}

const COLORS = ["#FF7A59", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

// Country flag emoji helper
const getCountryFlag = (code: string) => {
    const codePoints = code
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export function PageViewsChart({ data }: { data: { date: string; count: number }[] }) {
    const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d" | "all">("7d");

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date);
        const now = new Date();

        if (timeRange === "today") {
            return itemDate.toDateString() === now.toDateString();
        }

        if (timeRange === "7d") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return itemDate >= sevenDaysAgo;
        }

        if (timeRange === "30d") {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return itemDate >= thirtyDaysAgo;
        }

        return true;
    });

    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Page Views Over Time</h3>
                <div className="flex gap-1">
                    <Button
                        variant={timeRange === "today" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("today")}
                        className="h-7 text-xs px-2"
                    >
                        Today
                    </Button>
                    <Button
                        variant={timeRange === "7d" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("7d")}
                        className="h-7 text-xs px-2"
                    >
                        7 Days
                    </Button>
                    <Button
                        variant={timeRange === "30d" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("30d")}
                        className="h-7 text-xs px-2"
                    >
                        30 Days
                    </Button>
                    <Button
                        variant={timeRange === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("all")}
                        className="h-7 text-xs px-2"
                    >
                        All Time
                    </Button>
                </div>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            className="text-xs"
                        />
                        <YAxis className="text-xs" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#FF7A59"
                            strokeWidth={2}
                            dot={{ fill: "#FF7A59", strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function DeviceBreakdownChart({ data }: { data: { device: string; count: number }[] }) {
    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Device Breakdown</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="count"
                            nameKey="device"
                            label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function TopPagesChart({ data }: { data: { path: string; count: number }[] }) {
    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Top Pages</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis
                            dataKey="path"
                            type="category"
                            width={100}
                            className="text-xs"
                            tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + "..." : value}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                        />
                        <Bar dataKey="count" fill="#FF7A59" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function TopCountriesList({ data }: { data: { country: string; count: number }[] }) {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Top Countries</h3>
            <div className="space-y-3">
                {data.slice(0, 8).map((item, index) => {
                    const percentage = total > 0 ? (item.count / total) * 100 : 0;
                    return (
                        <div key={item.country} className="flex items-center gap-3">
                            <span className="text-lg">{getCountryFlag(item.country)}</span>
                            <span className="text-sm font-medium flex-1">{item.country}</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: COLORS[index % COLORS.length],
                                    }}
                                />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                                {item.count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
    return (
        <div className="space-y-6">
            {data.liveActivity && <ActivityFunnel data={data.liveActivity} />}
            <div className="grid gap-6 md:grid-cols-2">
                <PageViewsChart data={data.viewsByDay} />
                <DeviceBreakdownChart data={data.deviceBreakdown} />
                <TopPagesChart data={data.topPages} />
                <TopCountriesList data={data.topCountries} />
                <TrafficSourcesList data={data.trafficSources} />
            </div>
        </div>
    );
}

function TrafficSourcesList({ data }: { data: { referrer: string; count: number }[] }) {
    const getDomain = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '');
        } catch {
            return url;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((source) => (
                        <div key={source.referrer} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Globe className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium">{getDomain(source.referrer)}</span>
                            </div>
                            <span className="font-bold">{source.count}</span>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <div className="text-center text-muted-foreground py-4">
                            No traffic source data available
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
