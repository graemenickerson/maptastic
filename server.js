// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes,
// cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.cookieString],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(express.static("public"));

// Separated Routes for each Resource
const mapRoutes = require("./routes/map");
const userRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

// Mount all resource routes
app.use('/map', mapRoutes(db));
app.use('/users', userRoutes(db));
app.use('/register', registerRoutes(db));
app.use('/login', loginRoutes(db));
app.use('/logout', logoutRoutes());


// Home page
app.get("/", (req, res) => {
  const templateVars = {};
  if (req.session.userId !== undefined) {
    templateVars.loggedInUser = req.session.userId;
    templateVars.userName = req.session.userName;
  } else {
    req.session.userId = null;
    req.session.userName = null;
    templateVars.loggedInUser = req.session.userId;
    templateVars.userName = req.session.userName;
  }
  db.query(`
  SELECT maps.*, map_icons.icon, COUNT(users_favourites.id) as fave_count
  FROM maps
  JOIN map_icons ON maps.icon_id = map_icons.id
  LEFT JOIN users_favourites on maps.id = users_favourites.map_id
  GROUP BY maps.id, map_icons.icon
  ORDER BY date_created DESC;
  `)
    .then(data => {
      templateVars.mapsArr =  data.rows;
      res.render("index", templateVars);
    })
    .catch(err => console.log(err));
});


app.listen(PORT, () => {
  console.log(`wikiMap app listening on port ${PORT}`);
});
