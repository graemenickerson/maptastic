-- Drop and recreate points table

DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'point',
  description text,
  picture VARCHAR(255) DEFAULT 'https://cdn1.vectorstock.com/i/1000x1000/48/70/cityline-vector-21554870.jpg',
  lat DOUBLE PRECISION,
  long DOUBLE PRECISION,
  keyword_id INTEGER REFERENCES keywords(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT true
);
