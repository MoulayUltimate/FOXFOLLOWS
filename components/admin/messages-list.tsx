"use client";

import { ContactMessage } from "@/lib/db";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
    Mail,
    MailOpen,
    Trash2,
    ShoppingCart,
    HelpCircle,
    RefreshCcw,
    CreditCard,
    Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessagesListProps {
    messages: ContactMessage[];
    onMarkAsRead: (messageId: number, isRead: boolean) => void;
    onDelete: (messageId: number) => void;
}

const subjectIcons = {
    order: ShoppingCart,
    refund: RefreshCcw,
    delivery: Truck,
    billing: CreditCard,
    other: HelpCircle,
};

const subjectLabels = {
    order: "Order Issue",
    refund: "Refund Request",
    delivery: "Delivery Question",
    billing: "Billing Inquiry",
    other: "Other",
};

export function MessagesList({ messages, onMarkAsRead, onDelete }: MessagesListProps) {
    return (
        <div className="space-y-4">
            {messages.map((message) => {
                const SubjectIcon = subjectIcons[message.subject as keyof typeof subjectIcons] || HelpCircle;
                const subjectLabel = subjectLabels[message.subject as keyof typeof subjectLabels] || message.subject;
                const isUnread = message.is_read === 0;

                return (
                    <div
                        key={message.id}
                        className={cn(
                            "rounded-xl border p-4 transition-colors",
                            isUnread
                                ? "border-primary/30 bg-primary/5"
                                : "border-border bg-card"
                        )}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className={cn(
                                    "p-2 rounded-lg shrink-0",
                                    isUnread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                )}>
                                    <SubjectIcon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className={cn("font-semibold", isUnread && "text-primary")}>
                                            {message.name}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            &lt;{message.email}&gt;
                                        </span>
                                        {isUnread && (
                                            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-medium">{subjectLabel}</span>
                                        {message.order_id && (
                                            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                                                {message.order_id}
                                            </span>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                            • {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onMarkAsRead(message.id, !isUnread)}
                                    title={isUnread ? "Mark as read" : "Mark as unread"}
                                >
                                    {isUnread ? (
                                        <MailOpen className="h-4 w-4" />
                                    ) : (
                                        <Mail className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDelete(message.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
            {messages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground rounded-xl border border-border bg-card">
                    No messages found
                </div>
            )}
        </div>
    );
}
