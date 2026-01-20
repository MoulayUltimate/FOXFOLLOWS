// Database utility functions for Cloudflare D1
// Note: D1 binding must be configured in wrangler.toml

export interface Order {
    id: string;
    platform: string;
    service: string;
    quantity: number;
    price: number;
    username: string;
    email?: string;
    payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
    delivery_status: 'pending' | 'processing' | 'completed' | 'failed';
    country?: string;
    stripe_payment_id?: string;
    created_at: string;
    updated_at: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    order_id?: string;
    message: string;
    is_read: number;
    created_at: string;
}

export interface PageView {
    id: number;
    path: string;
    country?: string;
    city?: string;
    referrer?: string;
    user_agent?: string;
    session_id?: string;
    device_type?: 'desktop' | 'mobile' | 'tablet';
    created_at: string;
}

export interface AdminUser {
    id: number;
    username: string;
    password_hash: string;
    created_at: string;
}

export interface Product {
    id: string;
    platform: string;
    service: string;
    name: string;
    quantity: number;
    price: number;
    original_price?: number;
    is_popular: number;
    is_best_value: number;
    active: number;
    created_at?: string;
    updated_at?: string;
}

// Analytics summary types
export interface AnalyticsSummary {
    totalPageViews: number;
    uniqueVisitors: number;
    topCountries: { country: string; count: number }[];
    topPages: { path: string; count: number }[];
    viewsByDay: { date: string; count: number }[];
    deviceBreakdown: { device: string; count: number }[];
    liveActivity: {
        activeCarts: number;
        checkingOut: number;
        purchased: number;
    };
    trafficSources: { referrer: string; count: number }[];
}

export interface OrdersSummary {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    failedOrders: number;
    totalRevenue: number;
    todayRevenue: number;
    recentOrders: Order[];
}

export interface MessagesSummary {
    totalMessages: number;
    unreadMessages: number;
    recentMessages: ContactMessage[];
}

// Helper to get D1 database from request context
export function getDB(env: { DB: D1Database }): D1Database {
    return env.DB;
}

// Generate unique order ID
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${random}`.toUpperCase();
}

// Generate session ID for analytics
export function generateSessionId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;
}

// Detect device type from user agent
export function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
    const ua = userAgent.toLowerCase();
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// Simple password hashing (for demo - consider bcrypt for production)
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'foxfollows-salt-2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const computedHash = await hashPassword(password);
    return computedHash === hash;
}

// Type for D1 Database
declare global {
    interface D1Database {
        prepare(query: string): D1PreparedStatement;
        batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
        exec(query: string): Promise<D1ExecResult>;
    }

    interface D1PreparedStatement {
        bind(...values: unknown[]): D1PreparedStatement;
        first<T = unknown>(col?: string): Promise<T | null>;
        run<T = unknown>(): Promise<D1Result<T>>;
        all<T = unknown>(): Promise<D1Result<T>>;
        raw<T = unknown>(): Promise<T[]>;
    }

    interface D1Result<T = unknown> {
        results?: T[];
        success: boolean;
        error?: string;
        meta: object;
    }

    interface D1ExecResult {
        count: number;
        duration: number;
    }
}
