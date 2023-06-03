require('dotenv').config();

const mongoURI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : null;

  const secret = process.env.NODE_ENV === 'production'
  ? process.env.SECRET
  : null;

module.exports = { mongoURI };
