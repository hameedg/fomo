const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("trying")
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
