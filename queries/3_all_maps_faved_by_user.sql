SELECT maps.* FROM maps
JOIN users_favourites ON maps.id = map_id
WHERE users_favourites.user_id = 1
ORDER BY maps.date_created DESC;
