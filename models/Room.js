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
    isVersus: {
      type: Boolean,
      default: false,
    },
    tileset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tileset",
      required: true,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    bingofields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bingofield",
      },
    ],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "started", "finished"],
      default: "waiting",
    },
    maxPlayers: {
      type: Number,
      default: 4,
      min: 1,
      max: 8,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
