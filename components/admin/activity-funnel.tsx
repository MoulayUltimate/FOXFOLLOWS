"use client";

import { Card } from "@/components/ui/card";

interface ActivityFunnelProps {
    data: {
        activeCarts: number;
        checkingOut: number;
        purchased: number;
    };
}

export function ActivityFunnel({ data }: ActivityFunnelProps) {
    return (
        <Card className="p-6 mb-6">
            <div className="grid grid-cols-3 divide-x divide-border">
                <div className="px-4 first:pl-0">
                    <p className="text-sm text-muted-foreground mb-1">Active carts</p>
                    <p className="text-3xl font-bold">{data.activeCarts}</p>
                </div>
                <div className="px-4">
                    <p className="text-sm text-muted-foreground mb-1">Checking out</p>
                    <p className="text-3xl font-bold">{data.checkingOut}</p>
                </div>
                <div className="px-4">
                    <p className="text-sm text-muted-foreground mb-1">Purchased</p>
                    <p className="text-3xl font-bold text-green-500">{data.purchased}</p>
                </div>
            </div>
        </Card>
    );
}
