-- Drop and recreate keywords table

DROP TABLE IF EXISTS keywords CASCADE;

CREATE TABLE keywords (
  id SERIAL PRIMARY KEY,
  word VARCHAR(30),
  img_loc VARCHAR(255)
);
