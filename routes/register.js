
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieSession({
  name: 'session',
  keys: [process.env.cookieString],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = (db) => {

  // Shows page for creating new user
  router.get("/", (req,res) => {
      res.render("../views/register")
    });

  const addUser = function(user) {
    const values = [user.name, user.email, user.password];
    const sqlStatment = `
      INSERT INTO users (name, email, password)
      VALUES ( $1, $2, $3)
      RETURNING *;
    `;
    return db.query(sqlStatment, values)
      .then(res => res.rows)
      .catch((err) => {return null});
  };

  // Take new user info and stores it also assigns cookie
  router.post('/', (req, res) => {

    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    console.log("here");

    addUser(user)
      .then(user => {
        console.log(user);
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.redirect('index');
      })
      .catch(error => res.send(error));
  });


  return router;
};



