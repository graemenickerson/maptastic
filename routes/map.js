/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /map,
 *   these routes are mounted onto /map
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:id/addpoint/add", (req,res) => {
    const values = [req.params.id, req.body.title, req.body.description, req.body.image, req.body.keywords, req.body.lati, req.body.longi]
    const sqlStatment = `
      INSERT INTO points (map_id, title, description, picture, keyword_id, lat, long)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    db.query(sqlStatment,values)
      .then(returned => {
        res.redirect(`/map/${req.params.id}`);
      })
      .catch(err => console.log(err));
  });

  router.get("/", (req,res) => {
    db.query(`
      SELECT name, id
      FROM map_icons;
    `)
      .then(data => {
        const templateVars = {
          loggedInUser: req.session.userId,
          mapObj: 0,
          map_icons: data.rows,
          addPoint: 0
        };
        res.render("../views/map", templateVars);
      })
      .catch(err => console.log(err));
  });

  router.post("/", (req,res) => {
    const values = [req.session.userId, req.body.catRadio, req.body.title, req.body.description];
    const sqlStatment = `
      INSERT INTO maps (owner_id, icon_id, date_created, title, description)
      VALUES ($1, $2, NOW(), $3, $4)
      RETURNING *;
    `;
    console.log(req.body.catRadio);
    db.query(sqlStatment,values)
      .then(returned => {
        res.redirect(`/map/${returned.rows[0].id}`);
      })
      .catch(err => console.log(err));
  });



  router.get("/:id/addpoint", (req, res) => {
    const pointsQuery = db.query(`
    SELECT points.*, maps.title FROM points
    RIGHT JOIN maps ON maps.id = points.map_id
    WHERE maps.id = $1;
    `, [req.params.id]);
    const keywordsQuery = db.query(`
    SELECT * FROM keywords
    ORDER BY word;
    `);
    Promise.all([pointsQuery, keywordsQuery])
      .then(data => {
        const templateVars = {
          loggedInUser: req.session.userId,
          mapObj: data[0].rows[0],
          keywords: data[1].rows,
          addPoint: 1
        };
        res.render("map", templateVars);
      })
      .catch(err => console.log(err));
  });

  router.get("/:id", (req, res) => {
    db.query(`
      SELECT maps.*, users.name
      FROM maps JOIN users ON maps.owner_id = users.id
      WHERE maps.id = $1;
    `, [req.params.id])
      .then(data => {
        const templateVars = {
          loggedInUser: req.session.userId,
          mapObj: data.rows[0],
          addPoint: 0
        };
        res.render("map", templateVars);
      })
      .catch(err => console.log(err));
  });

  router.get("/:id/points", (req, res) => {
    db.query(`
      SELECT * FROM points
      JOIN keywords on points.keyword_id = keywords.id
      WHERE map_id = ${req.params.id};`)
      .then(data => {
        const points = data.rows;
        res.json({points});
      })
      .catch(err => console.log(err));
  });


  return router;
};


