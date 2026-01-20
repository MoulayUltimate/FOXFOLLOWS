"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/admin/stats-card";
import { MessagesList } from "@/components/admin/messages-list";
import { ContactMessage } from "@/lib/db";
import { MessageSquare, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface MessagesData {
    messages: ContactMessage[];
    summary: {
        totalMessages: number;
        unreadMessages: number;
    };
}

export default function AdminMessagesPage() {
    const router = useRouter();
    const [data, setData] = useState<MessagesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const fetchMessages = async (unreadOnly?: boolean) => {
        try {
            const params = new URLSearchParams();
            if (unreadOnly) params.set("unread", "true");

            const res = await fetch(`/api/admin/messages?${params}`);
            if (!res.ok) {
                if (res.status === 401) { router.push("/admin/login"); return; }
                throw new Error("Failed to fetch messages");
            }

            setData(await res.json());
        } catch (error) {
            toast.error("Failed to load messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(showUnreadOnly); }, [showUnreadOnly, router]);

    const handleMarkAsRead = async (messageId: number, isRead: boolean) => {
        const res = await fetch("/api/admin/messages", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageId, is_read: isRead }),
        });
        if (res.ok) { toast.success(isRead ? "Marked as read" : "Marked as unread"); fetchMessages(showUnreadOnly); }
    };

    const handleDelete = async (messageId: number) => {
        if (!confirm("Delete this message?")) return;
        const res = await fetch(`/api/admin/messages?id=${messageId}`, { method: "DELETE" });
        if (res.ok) { toast.success("Message deleted"); fetchMessages(showUnreadOnly); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    if (!data) return <div className="text-center py-12 text-muted-foreground">Failed to load messages</div>;

    return (
        <div className="space-y-8">
            <div><h1 className="text-3xl font-bold">Messages</h1><p className="text-muted-foreground mt-1">View and manage contact form submissions</p></div>
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard title="Total Messages" value={data.summary.totalMessages} icon={<MessageSquare className="h-5 w-5" />} />
                <StatsCard title="Unread" value={data.summary.unreadMessages} icon={<Mail className="h-5 w-5" />} />
                <StatsCard title="Read" value={data.summary.totalMessages - data.summary.unreadMessages} icon={<MailOpen className="h-5 w-5" />} />
            </div>
            <div className="flex gap-2">
                <Button variant={!showUnreadOnly ? "default" : "outline"} size="sm" onClick={() => setShowUnreadOnly(false)}>All Messages</Button>
                <Button variant={showUnreadOnly ? "default" : "outline"} size="sm" onClick={() => setShowUnreadOnly(true)}>Unread Only</Button>
            </div>
            <MessagesList messages={data.messages} onMarkAsRead={handleMarkAsRead} onDelete={handleDelete} />
        </div>
    );
}
