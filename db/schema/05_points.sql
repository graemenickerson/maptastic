-- Drop and recreate points table

DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  map_id INTEGER REFERENCES maps(id) NOT NULL ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'point',
  description text,
  picture VARCHAR(255) DEFAULT 'https://cdn1.vectorstock.com/i/1000x1000/48/70/cityline-vector-21554870.jpg',
  lat DOUBLE PRECISION,
  long DOUBLE PRECISION,
  category SMALLINT
);
