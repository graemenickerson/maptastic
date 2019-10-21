/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const templateVars = {
      loggedInUser: req.session.userId,
      mapObj: 0
    }
    res.render("../views/map", templateVars)
  });


  router.get("/:id", (req, res) => {
    db.query(`
    SELECT maps.*, users.name
    FROM maps JOIN users ON maps.owner_id = users.id
    WHERE maps.id = $1
    `, [req.params.id])
    .then(data => {
      const templateVars = {
        loggedInUser: req.session.userId,
        mapObj: data.rows[0]
      }
      res.render("map", templateVars);
    })

  })

  router.get("/:id/points", (req, res) => {
    db.query(`
    SELECT * FROM points
    JOIN keywords on points.keyword_id = keywords.id
    WHERE map_id = ${req.params.id}`)
    .then(data => {
      const points = data.rows;
      res.json({points});
    })
  });
  return router;
};
