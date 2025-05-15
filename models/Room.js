const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      length: 8,
      uppercase: true,
      trim: true,
    },
    tileset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tileset",
      required: true,
    },
    ruleset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ruleset", // Placeholder, create Ruleset model later
      required: true,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player", // Placeholder, create Player model later
      },
    ],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player", // Placeholder, create Player model later
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "active", "finished"],
      default: "waiting",
    },
    maxPlayers: {
      type: Number,
      default: 8,
    },
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
