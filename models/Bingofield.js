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
      ref: "User",
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
  },
  { timestamps: true }
);

// Auto-generate marked array before saving
BingofieldSchema.pre("validate", function (next) {
  if (
    typeof this.size === "number" &&
    (!Array.isArray(this.marked) ||
      this.marked.length !== this.size * this.size)
  ) {
    this.marked = Array(this.size * this.size).fill(false);
  }
  next();
});

module.exports = mongoose.model("Bingofield", BingofieldSchema);
