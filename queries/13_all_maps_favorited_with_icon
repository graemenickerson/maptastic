    SELECT maps.*, map_icons.icon, COUNT(users_favourites.id) as fave_count
    FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    LEFT JOIN users_favourites on maps.id = users_favourites.map_id
    GROUP BY maps.id, map_icons.icon
    ORDER BY date_created DESC;
