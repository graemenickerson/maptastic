
SELECT maps.id, maps.title, map_icons.icon FROM maps
JOIN map_icons ON maps.icon_id = map_icons.id
WHERE owner_id = 2;



SELECT maps.id, maps.title, map_icons.icon FROM maps
JOIN map_icons ON maps.icon_id = map_icons.id
JOIN users_favourites ON maps.id = map_id
WHERE users_favourites.user_id = 2;



SELECT maps.id, maps.title, map_icons.icon FROM maps
JOIN map_icons ON maps.icon_id = map_icons.id
JOIN  map_contributors ON maps.id = map_id
WHERE map_contributors.contributor_id = 2;
