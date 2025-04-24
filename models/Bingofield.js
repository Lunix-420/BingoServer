const mongoose = require("mongoose");

const BingofieldSchema = new mongoose.Schema(
  {
    tilesetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tileset",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Placeholder, create User model later
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game", // Placeholder, create Game model later
      required: true,
    },
    tiles: {
      type: [String],
      required: true,
    },
    marked: {
      type: [Boolean],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    isWinner: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bingofield", BingofieldSchema);
