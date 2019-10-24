SELECT points.*, maps.title FROM points
RIGHT JOIN maps ON maps.id = points.map_id;
