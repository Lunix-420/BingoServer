const Player = require("../models/Player");
const mongoose = require("mongoose");

// Create a new player
async function createPlayer(data) {
  const player = new Player(data);
  return await player.save();
}

// Get all players
async function getPlayers() {
  return await Player.find();
}

// Get a player by ID
async function getPlayerById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Player.findById(id);
}

// Update a player by ID
async function updatePlayer(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Player.findByIdAndUpdate(id, data, { new: true });
}

// Delete a player by ID
async function deletePlayer(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Player.findByIdAndDelete(id);
}

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
