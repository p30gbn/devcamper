const mongoose = require("mongoose");

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {});
  console.log(`Mongoose connected to ${conn.connection.host}`);
};

module.exports = connectDb;
