"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Session {
    id: string;
    user_name: string;
    user_email: string;
    status: string;
    last_message_at: string;
    last_message: string;
    unread_count: number;
}

interface Message {
    id: number;
    session_id: string;
    sender: 'user' | 'admin';
    message: string;
    created_at: string;
}

export default function AdminChatPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [reply, setReply] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Poll for sessions
    useEffect(() => {
        fetchSessions();
        const interval = setInterval(fetchSessions, 5000);
        return () => clearInterval(interval);
    }, []);

    // Poll for messages when session is selected
    useEffect(() => {
        if (!selectedSession) return;

        fetchMessages(selectedSession.id);
        const interval = setInterval(() => fetchMessages(selectedSession.id), 3000);
        return () => clearInterval(interval);
    }, [selectedSession]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchSessions = async () => {
        try {
            const res = await fetch("/api/admin/chat");
            if (res.ok) {
                const data = await res.json();
                setSessions(data.sessions);
            }
        } catch (error) {
            console.error("Failed to fetch sessions", error);
        }
    };

    const fetchMessages = async (sessionId: string) => {
        try {
            const res = await fetch(`/api/admin/chat?sessionId=${sessionId}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages);

                // Mark as read if needed
                if (selectedSession?.id === sessionId) {
                    await fetch("/api/admin/chat", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ sessionId }),
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !selectedSession) return;

        const newReply = reply;
        setReply("");

        // Optimistic update
        setMessages(prev => [...prev, {
            id: Date.now(),
            session_id: selectedSession.id,
            sender: 'admin',
            message: newReply,
            created_at: new Date().toISOString()
        }]);

        try {
            await fetch("/api/admin/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: selectedSession.id,
                    message: newReply,
                }),
            });
            fetchMessages(selectedSession.id);
        } catch (error) {
            console.error("Failed to send reply", error);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl border border-border bg-card overflow-hidden">
            {/* Sessions List */}
            <div className="border-r border-border flex flex-col">
                <div className="p-4 border-b border-border">
                    <h2 className="font-semibold mb-4">Active Chats</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {sessions.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No active chats
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className={cn(
                                    "w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors",
                                    selectedSession?.id === session.id && "bg-muted"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium truncate">{session.user_name || "Visitor"}</span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDistanceToNow(new Date(session.last_message_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                        {session.last_message}
                                    </p>
                                    {session.unread_count > 0 && (
                                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {session.unread_count}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col h-full bg-muted/10">
                {selectedSession ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{selectedSession.user_name || "Visitor"}</h3>
                                    <p className="text-xs text-muted-foreground">{selectedSession.user_email || "No email provided"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full",
                                        msg.sender === 'admin' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[70%] rounded-2xl px-4 py-3 text-sm",
                                            msg.sender === 'admin'
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-card border border-border text-foreground rounded-bl-none"
                                        )}
                                    >
                                        {msg.message}
                                        <p className={cn(
                                            "text-[10px] mt-1 opacity-70",
                                            msg.sender === 'admin' ? "text-primary-foreground" : "text-muted-foreground"
                                        )}>
                                            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-card border-t border-border">
                            <form onSubmit={handleSendReply} className="flex gap-2">
                                <Input
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type a reply..."
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={!reply.trim()}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <MessageSquare className="h-16 w-16 opacity-20 mb-4" />
                        <p>Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
