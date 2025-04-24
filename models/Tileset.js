const mongoose = require("mongoose");

const TilesetSchema = new mongoose.Schema(
  {
    size: {
      type: Number,
      enum: [3, 4, 5, 6],
      required: true,
    },
    tiles: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length === this.size * this.size;
        },
        message: (props) =>
          `Tiles array length (${
            props.value.length
          }) does not match size squared (${
            props.instance.size * props.instance.size
          })`,
      },
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tileset", TilesetSchema);
