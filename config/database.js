const keyDev = require("./key");

const mongoURI = process.env.NODE_ENV === "production" 
  ? process.env.MONGO_URI
  : keyDev;

module.exports = { mongoURI };