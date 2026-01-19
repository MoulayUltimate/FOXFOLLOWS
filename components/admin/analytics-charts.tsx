"use client";

import { AnalyticsSummary } from "@/lib/db";
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
    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Page Views Over Time</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
        <div className="grid gap-6 md:grid-cols-2">
            <PageViewsChart data={data.viewsByDay} />
            <DeviceBreakdownChart data={data.deviceBreakdown} />
            <TopPagesChart data={data.topPages} />
            <TopCountriesList data={data.topCountries} />
        </div>
    );
}
