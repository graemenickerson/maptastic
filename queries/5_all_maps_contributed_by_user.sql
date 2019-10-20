SELECT maps.* FROM map_contributors
JOIN maps ON maps.id = map_id
WHERE contributor_id = 1;
