/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /map,
 *   these routes are mounted onto /map
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
//**************************
//      POST REQUESTS
//**************************

//POST add a new point to specified map
  router.post("/:id/addpoint/add", (req,res) => {
    let values;
    if(!req.body.image) {
      values = [req.session.userId, req.params.id, req.body.title, req.body.description, '/images/default.png', req.body.keywords, req.body.lati, req.body.longi]
    } else {
      values = [req.session.userId, req.params.id, req.body.title, req.body.description, req.body.image, req.body.keywords, req.body.lati, req.body.longi]
    }
    const sqlStatment = `
      INSERT INTO points (user_id, map_id, title, description, picture, keyword_id, lat, long)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    if (req.body.lati === "" || req.body.longi === "") {
      res.redirect(`/map/${req.params.id}/addpoint`);
    } else {
      db.query(sqlStatment,values)
        .then(returned => {
          res.redirect(`/map/${req.params.id}`);
        })
        .catch(err => console.log(err));
    }
  });

  //POST add a new point to specified map
  router.post("/:id/editpoint", (req,res) => {
    const values = [req.body.title, req.body.description, req.body.image, req.body.keywords, req.body.pointid]
    const sqlStatment = `
      UPDATE points SET
      title = $1,
      description = $2,
      picture = $3,
      keyword_id = $4
      WHERE points.id = $5
    `;
    db.query(sqlStatment,values)
      .then(returned => {
        res.redirect(`/map/${req.params.id}`);
      })
      .catch(err => console.log(err));
  });

  router.post("/:id/deletepoint", (req,res) => {
    const values = [req.body.deletepointid]
    console.log(values);
    const sqlStatment = `
      UPDATE points SET
      active = false
      WHERE points.id = $1
    `;
    db.query(sqlStatment,values)
      .then(returned => {
        res.redirect(`/map/${req.params.id}`);
      })
      .catch(err => console.log(err));
  });

  //POST add favorite map to database
  router.post("/:id/favourite", (req, res) => {
    const values = [req.session.userId, req.params.id];
    const sqlStatement = `
    SELECT * FROM users_favourites
    WHERE user_id = $1
    AND map_id = $2;
    `;
    db.query(sqlStatement, values)
      .then ( data => {
        if (data.rows.length === 0) {
          const sqlStatement = `
          INSERT INTO users_favourites (user_id, map_id)
          VALUES ($1, $2);
          `;
          db.query(sqlStatement, values)
            .then( data => {
              res.redirect(`/map/${req.params.id}`);
            })
            .catch(err => console.log(err));
        } else {
          const sqlStatement = `
          DELETE FROM users_favourites
          WHERE user_id = $1
          AND map_id = $2;
          `;
          db.query(sqlStatement, values)
            .then( data => {
              res.redirect(`/map/${req.params.id}`);
            })
            .catch(err => console.log(err));
        }
    })
  });


  //POST add new map to database
  router.post("/", (req,res) => {
    lat = req.body.centerlat
    long = req.body.centerlong
    const values = [req.session.userId, req.body.catRadio, req.body.title, req.body.description, lat, long, req.body.zoom];
    const sqlStatment = `
      INSERT INTO maps (owner_id, icon_id, date_created, title, description, center_lat, center_long, zoom)
      VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    db.query(sqlStatment,values)
      .then(returned => {
        res.redirect(`/map/${returned.rows[0].id}`);
      })
      .catch(err => console.log(err));
  });


  //**************************
  //      GET REQUESTS
  //**************************

  // GET points from database, render map with points, show all keyword options on partial
  router.get("/:id/addpoint", (req, res) => {
    const loggedInUser= req.session.userId;
    if (loggedInUser) {
      const pointsQuery = db.query(`
      SELECT points.*, maps.title, maps.center_lat, maps.center_long, maps.zoom FROM points
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
            userName: req.session.userName,
            loggedInUser: loggedInUser,
            mapObj: data[0].rows[0],
            keywords: data[1].rows,
            addPoint: 1,
            editPoint: 0
          };
          res.render("map", templateVars);
      })
      .catch(err => console.log(err));
    } else {
      res.redirect(`/map/${req.params.id}`);
    }
  });
  // GET points from database, render map with points, show all keyword options on partial
  router.get("/:id/editpoint", (req, res) => {
    const loggedInUser= req.session.userId;
    if (loggedInUser) {
      const pointsQuery = db.query(`
      SELECT points.*, maps.title, maps.id as map_id, maps.center_lat, maps.center_long, maps.zoom FROM points
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
            loggedInUser: loggedInUser,
            userName: req.session.userName,
            mapObj: data[0].rows[0],
            keywords: data[1].rows,
            addPoint: 0,
            editPoint: 1
          };
          res.render("map", templateVars);
      })
      .catch(err => console.log(err));
    } else {
      res.redirect(`/map/${req.params.id}`);
    }
  });

  //GET points associated with given map id
  router.get("/:id/points", (req, res) => {
    db.query(`
      SELECT points.*, keywords.img_loc, keywords.word, users.name as user_name FROM points
      JOIN keywords on points.keyword_id = keywords.id
      JOIN users on users.id = points.user_id
      WHERE map_id = ${req.params.id};`)
      .then(data => {
        const points = data.rows;
        res.json({points});
      })
      .catch(err => console.log(err));
  });

    //GET map id, render map with all the associated info (favorites, map id)
  router.get("/:id", (req, res) => {
    db.query(`
      SELECT maps.*, users.name, COUNT(users_favourites.*) as faved
      FROM maps JOIN users ON maps.owner_id = users.id
      LEFT JOIN users_favourites ON maps.id = map_id
      WHERE maps.id = $1
      GROUP BY maps.id, users.name;
    `, [req.params.id])
      .then(data => {
        mapObj = data.rows[0]
        if (mapObj) {
          const templateVars = {
            loggedInUser: req.session.userId,
            userName: req.session.userName,
            mapObj: mapObj,
            addPoint: 0,
            editPoint: 0
          };
          res.render("map", templateVars);
        } else {
          res.redirect('/')
        }
      })
      .catch(err => {
        console.log(err);
      })
  });


  //GET page to create a new map
  router.get("/", (req,res) => {
    const loggedInUser= req.session.userId;
    if (loggedInUser) {
      db.query(`
        SELECT name, id
        FROM map_icons;
      `)
        .then(data => {
          const templateVars = {
            loggedInUser: loggedInUser,
            userName: req.session.userName,
            mapObj: 0,
            map_icons: data.rows,
            addPoint: 0,
            editPoint: 0
          };
          res.render("../views/map", templateVars);
        })
        .catch(err => console.log(err));
    } else {
      res.redirect(`/`);
    }
  });


  return router;
};


