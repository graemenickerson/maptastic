/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const templateVars = {
      loggedInUser: req.session.userId,
      user: 0,
    }
    res.render("users", templateVars)
  });

  router.get("/:id", (req, res) => {
    db.query(`
    SELECT * FROM users
    WHERE users.id = $1
    `, [req.params.id])
    .then(data => {
      const templateVars = {
        loggedInUser: req.session.userId,
        user: data.rows[0]
      }
      res.render("users", templateVars)
    })
    .catch(err => console.log(err));
  });

  router.get("/:id/maps", (req, res) => {
    const myMaps = db.query(`
    SELECT maps.id, maps.title, map_icons.icon FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    WHERE owner_id = $1;
    `, [req.params.id]);

    const myFaves = db.query(`
    SELECT maps.id, maps.title, map_icons.icon FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    JOIN users_favourites ON maps.id = map_id
    WHERE users_favourites.user_id = $1;
    `, [req.params.id]);

    const myContributions = db.query(`
    SELECT maps.id, maps.title, map_icons.icon FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    JOIN  map_contributors ON maps.id = map_id
    WHERE map_contributors.contributor_id = $1;
    `, [req.params.id]);


    Promise.all([myMaps, myFaves, myContributions])
    .then(data => {
      const userMaps = {
        myMaps: data[0].rows,
        myFaves: data[1].rows,
        myContributions: data[2].rows
      };
      res.json(userMaps)


    })
    .catch(err => console.log(err));

  //   .then(data => {
  //     const points = data.rows;
  //     res.json({points});
  //   })
  //   .catch(err => console.log(err));
  });

  return router;
}
