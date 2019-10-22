// register.js

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
    if (!req.session === undefined) {
      const templateVars =  {
        loggedInUser: req.session.userId,
        userName: req.session.userName
      };
      res.render("register", templateVars);
    } else {
      req.session.userId = null;
      const templateVars =  { loggedInUser: req.session.userId };
      res.render("register", templateVars);
    }
  });

  const addUser = function(user) {
    const values = [user.name, user.email, user.password];
    const sqlStatment = `
      INSERT INTO users (name, email, password)
      VALUES ( $1, $2, $3)
      RETURNING *;
    `;
    return db.query(sqlStatment, values)
      .then(res => res.rows[0])
      .catch((err) => {
        return null;
      });
  };

  const getUserByEmail = function(user) {
    const value = [user.email];
    const sqlStatment = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    return db.query(sqlStatment, value)
      .then(res => {
        return res.rows[0];
      })
      .catch((err) => {
        return null;
      });
  };

  // Take new user info and stores it also assigns cookie
  router.post('/', (req, res) => {
    const user = req.body;
    getUserByEmail(user)
      .then(exists => {
        if (exists) {
          res.redirect('register');
        } else {
          user.password = bcrypt.hashSync(user.password, 10);
          addUser(user)
            .then(user => {
              req.session.userId = user.id;
              req.session.userName = user.name;
              res.redirect('/');
            })
            .catch(error => res.send(error));
        }
      })
      .catch(err => res.send(err));
  });

  return router;
};



