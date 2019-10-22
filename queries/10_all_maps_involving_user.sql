
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









-- SELECT maps.id as my_maps, users_favourites.map_id as my_faves, map_contributors.map_id as my_contributions
-- FROM maps
-- JOIN users ON users.id = maps.owner_id
-- JOIN users_favourites ON users.id = users_favourites.user_id
-- JOIN map_contributors ON users.id = map_contributors.contributor_id
-- WHERE users.id = 1;

-- SELECT maps.id as my_maps, users_favourites.map_id as my_faves, map_contributors.map_id as my_contributions
-- FROM maps
-- JOIN users ON users.id = maps.owner_id
-- JOIN users_favourites ON users.id = users_favourites.user_id
-- JOIN map_contributors ON users.id = map_contributors.contributor_id
-- WHERE users.id = 1;

-- SELECT maps.id, maps.title FROM maps
-- JOIN users ON users.id = maps.owner_id
-- WHERE users.id = 2;

-- SELECT maps.id, maps.title FROM maps
-- JOIN users_favourites ON maps.id = map_id
-- WHERE users_favourites.user_id = 2;

-- SELECT maps.id, maps.title FROM maps
-- JOIN  map_contributors ON maps.id = map_id
-- WHERE map_contributors.contributor_id = 2;


-- SELECT maps.id, maps.title FROM maps
-- JOIN users ON users.id = maps.owner_id
-- JOIN users_favourites ON users_favourites.map_id = maps.id
-- WHERE users.id = 1;

-- SELECT maps.id, maps.title FROM maps
-- JOIN users ON users.id = maps.owner_id
-- JOIN map_contributors ON map_contributors.contributor_id = users.id
-- WHERE users.id = 2;

-- SELECT maps.id, maps.title FROM users_favourites
-- JOIN users ON users.id = users_favourites.user_id
-- WHERE users.id = 1;

-- SELECT map_contributors.map_id as my_contributions FROM map_contributors
-- JOIN users ON users.id = map_contributors.contributor_id
-- WHERE users.id = 1;

