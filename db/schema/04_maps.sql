DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  icon_id INTEGER REFERENCES map_icons(id) ON DELETE CASCADE,
  date_created TIMESTAMP,
  title VARCHAR(100),
  description TEXT,
  center_lat DOUBLE PRECISION,
  center_long DOUBLE PRECISION,
  zoom INT
);
