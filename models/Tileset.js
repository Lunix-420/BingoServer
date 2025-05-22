const mongoose = require("mongoose");

const TilesetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      enum: [3, 4, 5, 6],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
    },
    tiles: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length === this.size * this.size;
        },
        message: function (props) {
          return `Tiles array length (${
            props.value.length
          }) does not match size squared (${this.size * this.size})`;
        },
      },
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    plays: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tileset", TilesetSchema);
