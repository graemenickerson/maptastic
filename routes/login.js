// login.js

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.cookieString],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = (db) => {

  const getUserByEmail = function(user) {
    const value = [user];
    const sqlStatment = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    return db.query(sqlStatment, value)
      .then(res => {
        return res.rows[0];
      })
      .catch((err) => console.log(err));
  };

  // Logs a user in after authentication.
  router.post("/", (req,res) => {
    const userEmail = req.body.email;
    getUserByEmail(userEmail)
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          req.session.userId = user.id;
          req.session.userName = user.name;
          res.redirect("/");
        } else {
          res.redirect("/");
        }
      })
      .catch(err => res.status(404).send(err));
  });

  return router;
};


