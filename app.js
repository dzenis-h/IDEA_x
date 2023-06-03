require('dotenv').config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

// Get the secret values
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

// Init app
const app = express();

// Load routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/database");

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Adding a session store
const MongoDBStore = require('connect-mongodb-session')(session);
// Configure MongoDB Atlas connection details
const store = new MongoDBStore({
  uri: db.mongoURI,
  collection: 'sessions',
  // Additional options if needed
});

// Handle MongoDB connection errors
store.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

// Configure session middleware using MongoDBStore
app.use(
  session({
    secret: "kakoTiJeNena",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Handlebars Middleware
// Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", "handlebars");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Method override middleware
app.use(methodOverride("_method"));

// Express session midleware
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about");
});

// Use routes
app.use("/ideas", ideas);
app.use("/users", users);

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});