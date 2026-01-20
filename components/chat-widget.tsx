"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    sender: 'user' | 'admin';
    message: string;
    created_at: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load session from local storage on mount
    useEffect(() => {
        const storedSession = localStorage.getItem("chat_session_id");
        if (storedSession) {
            setSessionId(storedSession);
            fetchMessages(storedSession);
        }
    }, []);

    // Poll for new messages
    useEffect(() => {
        if (!isOpen || !sessionId) return;

        const interval = setInterval(() => {
            fetchMessages(sessionId);
        }, 5000);

        return () => clearInterval(interval);
    }, [isOpen, sessionId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const fetchMessages = async (sid: string) => {
        try {
            const res = await fetch(`/api/chat?sessionId=${sid}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = message;
        setMessage("");

        // Optimistic update
        const tempId = Date.now();
        setMessages(prev => [...prev, {
            id: tempId,
            sender: 'user',
            message: newMessage,
            created_at: new Date().toISOString()
        }]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    message: newMessage,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (!sessionId) {
                    setSessionId(data.sessionId);
                    localStorage.setItem("chat_session_id", data.sessionId);
                }
                // Refresh messages to get the real ID and any new replies
                fetchMessages(data.sessionId || sessionId);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
                    isOpen ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100"
                )}
                size="icon"
            >
                <MessageSquare className="h-6 w-6" />
            </Button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-[350px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 origin-bottom-right",
                    isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="h-2 w-2 rounded-full bg-green-400 absolute bottom-0 right-0 ring-2 ring-primary"></div>
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Support Team</h3>
                            <p className="text-xs opacity-90">We typically reply in minutes</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                            <MessageSquare className="h-12 w-12 opacity-20 mb-2" />
                            <p className="text-sm">Send us a message!</p>
                            <p className="text-xs">We're here to help.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-full",
                                    msg.sender === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                        msg.sender === 'user'
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-muted text-foreground rounded-bl-none"
                                    )}
                                >
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="border-t border-border p-3 bg-card">
                    <div className="flex gap-2">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!message.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
