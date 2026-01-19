"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/admin/stats-card";
import { OrdersTable } from "@/components/admin/orders-table";
import { Order } from "@/lib/db";
import {
    ShoppingCart,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface OrdersData {
    orders: Order[];
    summary: {
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        failedOrders: number;
        totalRevenue: number;
        todayRevenue: number;
    };
}

export default function AdminOrdersPage() {
    const router = useRouter();
    const [data, setData] = useState<OrdersData | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");

    const fetchOrders = async (status?: string) => {
        try {
            const params = new URLSearchParams();
            if (status && status !== "all") {
                params.set("status", status);
            }

            const res = await fetch(`/api/admin/orders?${params}`);
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/admin/login");
                    return;
                }
                throw new Error("Failed to fetch orders");
            }

            const result = await res.json();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(filter);
    }, [filter, router]);

    const handleUpdateStatus = async (orderId: string, status: { payment_status?: string; delivery_status?: string }) => {
        try {
            const res = await fetch("/api/admin/orders", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, ...status }),
            });

            if (res.ok) {
                toast.success("Order updated successfully");
                fetchOrders(filter);
            } else {
                toast.error("Failed to update order");
            }
        } catch (error) {
            toast.error("Failed to update order");
        }
    };

    const handleDelete = async (orderId: string) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        try {
            const res = await fetch(`/api/admin/orders?id=${orderId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Order deleted successfully");
                fetchOrders(filter);
            } else {
                toast.error("Failed to delete order");
            }
        } catch (error) {
            toast.error("Failed to delete order");
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
                Failed to load orders
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Orders</h1>
                <p className="text-muted-foreground mt-1">
                    Manage and track all customer orders
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatsCard title="Total Orders" value={data.summary.totalOrders} icon={<ShoppingCart className="h-5 w-5" />} />
                <StatsCard title="Pending" value={data.summary.pendingOrders} icon={<Clock className="h-5 w-5" />} />
                <StatsCard title="Completed" value={data.summary.completedOrders} icon={<CheckCircle className="h-5 w-5" />} />
                <StatsCard title="Failed" value={data.summary.failedOrders} icon={<XCircle className="h-5 w-5" />} />
                <StatsCard title="Revenue" value={`$${data.summary.totalRevenue.toFixed(2)}`} icon={<DollarSign className="h-5 w-5" />} />
            </div>

            <div className="flex gap-2 flex-wrap">
                {["all", "pending", "completed", "failed"].map((status) => (
                    <Button key={status} variant={filter === status ? "default" : "outline"} size="sm" onClick={() => setFilter(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                ))}
            </div>

            <OrdersTable orders={data.orders} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
        </div>
    );
}
