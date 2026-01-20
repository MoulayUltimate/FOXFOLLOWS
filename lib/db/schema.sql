-- FoxFollows Admin Panel Database Schema
-- Cloudflare D1 (SQLite)

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  service TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  delivery_status TEXT DEFAULT 'pending' CHECK(delivery_status IN ('pending', 'processing', 'completed', 'failed')),
  country TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  order_id TEXT,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Page views for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  country TEXT,
  city TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  device_type TEXT CHECK(device_type IN ('desktop', 'mobile', 'tablet')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- Products table for dynamic pricing
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  service TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  original_price REAL,
  is_popular INTEGER DEFAULT 0,
  is_best_value INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
