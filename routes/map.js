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

  router.get("/id", (req, res) => {
    db.query(`
    SELECT * FROM points`)
    .then(data => {
      const points = data.rows;
      res.json({points});
    })
  });

  return router;

};

// .then(data => {
//   console.log(data.rows);
//   const users = data.rows;
//   res.json({ users });
// })
// // console.log(users);
// for(user of users.users) {
//   $("<div>").text(user.name).appendTo($("body"));
// }


