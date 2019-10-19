-- Drop and recreate point_keywords table

DROP TABLE IF EXISTS point_keywords CASCADE;

CREATE TABLE point_keywords (
  id SERIAL PRIMARY KEY,
  point_id INTEGER REFERENCES points(id) ON DELETE CASCADE,
  keyword_id INTEGER REFERENCES keywords(id)ON DELETE CASCADE
);
