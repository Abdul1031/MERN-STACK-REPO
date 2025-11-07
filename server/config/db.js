const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
