const mongoURI = process.env.NODE_ENV === "production" 
  ? process.env.MONGO_URI
  : require("./key")(mongo);

module.exports = { mongoURI };