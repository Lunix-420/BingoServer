const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
