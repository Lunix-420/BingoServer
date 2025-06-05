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
    isPublic: {
      type: Boolean,
      default: false,
    },
    isVersus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
