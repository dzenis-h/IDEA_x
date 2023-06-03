require('dotenv').config();
// const key = require("./key");

const mongoURI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : null;

  const secret = process.env.NODE_ENV === 'production'
  ? process.env.SECRET
  : "secret";

module.exports = { mongoURI, secret };
