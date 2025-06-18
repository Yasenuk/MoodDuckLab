DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    avatar_id INTEGER NOT NULL CHECK (avatar_id BETWEEN 1 AND 21),
    review_text TEXT NOT NULL,
    pros TEXT,
    cons TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);