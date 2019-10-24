/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const templateVars = {
      loggedInUser: req.session.userId,
      userName: req.session.userName,
      user: 0,
    };
    res.render("users", templateVars);
  });

  router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (Number.isInteger(id)) {
      db.query(`
      SELECT * FROM users
      WHERE users.id = $1
      `, [id])
        .then(data => {
          const templateVars = {
            loggedInUser: req.session.userId,
            userName: req.session.userName,
            user: data.rows[0]

          };

          res.render("users", templateVars);

        })
        .catch(err => console.log(err));
    } else {
      res.redirect('/');
    }
  });

  router.get("/:id/maps", (req, res) => {
    const myMaps = db.query(`
    SELECT maps.id, maps.title, map_icons.icon FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    WHERE owner_id = $1
    ORDER BY maps.date_created;
    `, [req.params.id]);

    const myFaves = db.query(`
    SELECT DISTINCT maps.id, maps.title, map_icons.icon FROM maps
    JOIN map_icons ON maps.icon_id = map_icons.id
    JOIN users_favourites ON maps.id = map_id
    WHERE users_favourites.user_id = $1;
    `, [req.params.id]);

    const myContributions = db.query(`
    SELECT DISTINCT maps.id, maps.title, map_icons.icon FROM maps
    JOIN points on maps.id = map_id
    JOIN map_icons ON map_icons.id = maps.icon_id
    WHERE points.user_id = $1;
    `, [req.params.id]);

    Promise.all([myMaps, myFaves, myContributions])
      .then(data => {
        const userMaps = {
          myMaps: data[0].rows,
          myFaves: data[1].rows,
          myContributions: data[2].rows
        };
        res.json(userMaps);
      })
      .catch(err => console.log(err));

  });

  return router;
};
