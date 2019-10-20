SELECT maps.*, COUNT(users_favourites.id) as fave_count
FROM maps
JOIN users_favourites on maps.id = map_id
GROUP BY maps.id
ORDER BY fave_count DESC;

