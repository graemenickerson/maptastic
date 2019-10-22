SELECT maps.*, map_icons.icon
FROM maps
JOIN map_icons ON maps.icon_id = map_icons.id
ORDER BY date_created DESC;
