"use client";

import { Order } from "@/lib/db";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
    MoreHorizontal,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersTableProps {
    orders: Order[];
    onUpdateStatus: (orderId: string, status: { payment_status?: string; delivery_status?: string }) => void;
    onDelete: (orderId: string) => void;
}

const paymentStatusConfig = {
    pending: { icon: Clock, color: "text-yellow-600 bg-yellow-100", label: "Pending" },
    completed: { icon: CheckCircle, color: "text-green-600 bg-green-100", label: "Completed" },
    failed: { icon: XCircle, color: "text-red-600 bg-red-100", label: "Failed" },
    refunded: { icon: AlertCircle, color: "text-purple-600 bg-purple-100", label: "Refunded" },
};

const deliveryStatusConfig = {
    pending: { icon: Clock, color: "text-yellow-600 bg-yellow-100", label: "Pending" },
    processing: { icon: Truck, color: "text-blue-600 bg-blue-100", label: "Processing" },
    completed: { icon: CheckCircle, color: "text-green-600 bg-green-100", label: "Delivered" },
    failed: { icon: XCircle, color: "text-red-600 bg-red-100", label: "Failed" },
};

export function OrdersTable({ orders, onUpdateStatus, onDelete }: OrdersTableProps) {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Platform
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Service
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Username / URL
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Delivery
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {orders.map((order) => {
                            const paymentConfig = paymentStatusConfig[order.payment_status as keyof typeof paymentStatusConfig] || paymentStatusConfig.pending;
                            const deliveryConfig = deliveryStatusConfig[order.delivery_status as keyof typeof deliveryStatusConfig] || deliveryStatusConfig.pending;
                            const PaymentIcon = paymentConfig.icon;
                            const DeliveryIcon = deliveryConfig.icon;

                            return (
                                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="font-mono text-sm">{order.id}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="font-medium">{order.platform}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                                        {order.service}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {order.quantity.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap font-medium">
                                        ${order.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground max-w-[150px] truncate" title={order.username}>
                                        {order.username}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                                        {order.email || "-"}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", paymentConfig.color)}>
                                            <PaymentIcon className="h-3 w-3" />
                                            {paymentConfig.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {order.stripe_payment_id ? (
                                            <span className="font-mono text-xs text-muted-foreground" title={order.stripe_payment_id}>
                                                {order.stripe_payment_id.substring(0, 8)}...
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", deliveryConfig.color)}>
                                            <DeliveryIcon className="h-3 w-3" />
                                            {deliveryConfig.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, { payment_status: 'completed' })}>
                                                    Mark Payment Complete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, { delivery_status: 'completed' })}>
                                                    Mark Delivered
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, { delivery_status: 'processing' })}>
                                                    Mark Processing
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(order.id)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    Delete Order
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {orders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No orders found
                </div>
            )}
        </div>
    );
}
