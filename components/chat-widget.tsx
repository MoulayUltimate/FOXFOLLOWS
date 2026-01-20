"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
    id: number;
    sender: 'user' | 'admin';
    message: string;
    created_at: string;
}

const WELCOME_MESSAGES = [
    "How can we help you today?",
    "Hello! Need any assistance?",
    "Welcome to FoxFollows Support!",
    "Hi there! Ask us anything."
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [hasJoined, setHasJoined] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [showBubble, setShowBubble] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Set random welcome message on mount and show bubble
    useEffect(() => {
        setWelcomeMessage(WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]);

        // Show bubble after 2 seconds
        const timer = setTimeout(() => {
            setShowBubble(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Load session from local storage on mount
    useEffect(() => {
        const storedSession = localStorage.getItem("chat_session_id");
        const storedName = localStorage.getItem("chat_user_name");

        if (storedSession) {
            setSessionId(storedSession);
            setHasJoined(true);
            fetchMessages(storedSession);
        }

        if (storedName) {
            setName(storedName);
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

    const handleJoinChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        localStorage.setItem("chat_user_name", name);
        setHasJoined(true);
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
                    name: name,
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
            {/* Floating Welcome Bubble */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-40 max-w-[250px] bg-white text-foreground px-4 py-3 rounded-2xl rounded-br-none shadow-xl border border-border transition-all duration-500 transform",
                    showBubble && !isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                )}
            >
                <div className="text-sm font-medium relative">
                    {welcomeMessage}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowBubble(false);
                        }}
                        className="absolute -top-2 -right-2 h-5 w-5 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Chat Button */}
            <Button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowBubble(false);
                }}
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
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 bg-white rounded-full p-1 overflow-hidden">
                            <Image
                                src="/fox-logo.png"
                                alt="FoxFollows"
                                fill
                                className="object-contain p-1"
                            />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 absolute bottom-0 right-0 ring-2 ring-white z-10"></div>
                        </div>
                        <div className="flex flex-col justify-center text-left">
                            <h3 className="font-semibold text-sm leading-tight">FoxFollows Support</h3>
                            <p className="text-xs opacity-90 leading-tight">Online</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 shrink-0"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {!hasJoined ? (
                    <div className="p-6 space-y-6 bg-secondary/10 h-[400px] flex flex-col justify-center">
                        <div className="text-center space-y-3">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-xl">Welcome!</h3>
                            <p className="text-sm text-muted-foreground">{welcomeMessage}</p>
                            <p className="text-xs text-muted-foreground/80">Please enter your name to start chatting.</p>
                        </div>
                        <form onSubmit={handleJoinChat} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="text-center"
                                />
                            </div>
                            <Button type="submit" className="w-full font-semibold">Start Chat</Button>
                        </form>
                    </div>
                ) : (
                    <>
                        {/* Messages Area */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
                            {messages.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <MessageSquare className="h-6 w-6 text-primary opacity-50" />
                                    </div>
                                    <p className="text-sm font-medium">{welcomeMessage}</p>
                                    <p className="text-xs opacity-70">We'll be with you shortly.</p>
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
                                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                                msg.sender === 'user'
                                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                                    : "bg-card border border-border text-foreground rounded-bl-none"
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
                    </>
                )}
            </div>
        </>
    );
}
