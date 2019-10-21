SELECT maps.*, users.name, points.title as point_title, points.id as point_id
FROM maps JOIN users ON maps.owner_id = users.id
JOIN points ON points.map_id = maps.id
WHERE maps.id = 1;
