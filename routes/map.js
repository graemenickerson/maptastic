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
    res.render("../views/map")
  });

  router.get("/:id", (req, res) => {
    res.render("map");
  })

  router.get("/:id/points", (req, res) => {
    db.query(`
    SELECT * FROM points
    WHERE map_id = ${req.params.id}`)
    .then(data => {
      const points = data.rows;
      console.log(points);
      res.json({points});
    })
  });

  return router;

};





