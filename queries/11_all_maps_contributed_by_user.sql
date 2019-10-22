SELECT maps.id, maps.title, map_icons.icon
FROM maps
JOIN points on maps.id = map_id
JOIN map_icons ON map_icons.id = maps.icon_id
WHERE points.user_id = 1;
