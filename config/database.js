const mongoURI = process.env.NODE_ENV === "production" 
  ? process.env.MONGO_URI
  : "Set-up your own mongoURI"

module.exports = { mongoURI };