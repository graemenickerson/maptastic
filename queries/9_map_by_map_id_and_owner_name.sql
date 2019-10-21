SELECT maps.*, users.name
FROM maps JOIN users ON maps.owner_id = users.id
WHERE maps.id = 2;
