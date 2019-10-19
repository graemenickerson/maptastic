-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users_favourites CASCADE;

CREATE TABLE users_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
