/* ─── D1 Schema — OhHoney.ai ────────────────────────────────────────── */

-- Members
CREATE TABLE IF NOT EXISTS members (
  id          TEXT PRIMARY KEY,          -- UUID
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  avatar_url  TEXT,
  tier        TEXT NOT NULL DEFAULT 'trial',   -- trial | member | pro | team | white_glove
  status      TEXT NOT NULL DEFAULT 'active',  -- active | cancelled | past_due | trial
  whop_user_id TEXT,
  trial_ends_at INTEGER,                  -- unix timestamp
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id          TEXT PRIMARY KEY,          -- UUID
  member_id   TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  token       TEXT UNIQUE NOT NULL,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  expires_at  INTEGER NOT NULL           -- unix timestamp
);

-- Deals
CREATE TABLE IF NOT EXISTS deals (
  id           TEXT PRIMARY KEY,
  category     TEXT NOT NULL,
  title        TEXT NOT NULL,
  partner      TEXT NOT NULL,
  description  TEXT,
  value        TEXT,
  affiliate_url TEXT,                    -- admin-only, never exposed to frontend
  min_tier     TEXT NOT NULL DEFAULT 'member',  -- trial | member | pro | team
  exclusive    INTEGER NOT NULL DEFAULT 0,      -- boolean
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at   INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Events (OhHoney Intensive + future events)
CREATE TABLE IF NOT EXISTS events (
  id           TEXT PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  date_ts      INTEGER NOT NULL,
  price        INTEGER NOT NULL,          -- cents
  member_price INTEGER NOT NULL,          -- cents
  capacity     INTEGER NOT NULL DEFAULT 40,
  seats_sold   INTEGER NOT NULL DEFAULT 0,
  is_open      INTEGER NOT NULL DEFAULT 1,
  description  TEXT,
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Orders / Purchases
CREATE TABLE IF NOT EXISTS orders (
  id           TEXT PRIMARY KEY,
  member_id    TEXT NOT NULL REFERENCES members(id),
  type         TEXT NOT NULL,             -- subscription | event
  tier         TEXT,                      -- for subscriptions
  event_id     TEXT REFERENCES events(id),
  amount       INTEGER NOT NULL,          -- cents
  currency     TEXT NOT NULL DEFAULT 'usd',
  whop_order_id TEXT,
  status       TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed | refunded
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Intelligence briefings
CREATE TABLE IF NOT EXISTS briefings (
  id          TEXT PRIMARY KEY,
  category    TEXT NOT NULL,
  headline    TEXT NOT NULL,
  body        TEXT NOT NULL,
  min_tier    TEXT NOT NULL DEFAULT 'member',
  published_at INTEGER NOT NULL DEFAULT (unixepoch()),
  is_published INTEGER NOT NULL DEFAULT 1
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_token     ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_member    ON sessions(member_id);
CREATE INDEX IF NOT EXISTS idx_deals_category     ON deals(category);
CREATE INDEX IF NOT EXISTS idx_orders_member      ON orders(member_id);
CREATE INDEX IF NOT EXISTS idx_briefings_category ON briefings(category);
