const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URI);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('DB connected');
  })
}

module.exports = connectDB;