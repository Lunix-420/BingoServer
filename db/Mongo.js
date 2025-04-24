const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bingo";

function connectToMongo() {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected!");
  });
}

module.exports = { connectToMongo };
