// logout.js


const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.cookieString],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = () => {
  // Logs user out and deletes cookie from browser
  router.get("/", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
};
