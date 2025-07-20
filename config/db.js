const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/ai_products");
    console.log("connected to mongodb");
  } catch (err) {
    console.error("cann't connect to mongodb", err);
    process.exit(1);
  }
};

module.exports = connectDB;
