const mongoose = require("mongoose");
const config = require("../configs/app");

const connectToMongo = async () => {
  try {
    mongoose.connect(config.mongodbUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error: ", error);
  }
};

module.exports = connectToMongo();
