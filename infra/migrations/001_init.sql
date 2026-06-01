CREATE TABLE urls (
    id UUID PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    long_url TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_urls_code
ON urls(code);
