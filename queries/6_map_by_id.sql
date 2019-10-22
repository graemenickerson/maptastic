SELECT maps.*, users.name, COUNT(users_favourites.*) as faved
FROM maps JOIN users ON maps.owner_id = users.id
JOIN users_favourites ON maps.id = map_id
WHERE maps.id = 2
GROUP BY maps.id, users.name;
