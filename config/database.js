const mongoURI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : null;

module.exports = { mongoURI };
