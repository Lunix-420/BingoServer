const Player = require("../models/Player");
const mongoose = require("mongoose");

// Create a new player
async function createPlayer(data) {
  if ("name" in data && data.name.length > 0) {
    const name = data.name.trim();
    // Create a new player instance
    const player = new Player({ name });
    try {
      // Save the player to the database
      const savedPlayer = await player.save();
      return savedPlayer;
    } catch (error) {
      console.error("Error creating player:", error);
      throw new Error(
        "Nyaa~! I couldn't create your player! Maybe the player spirits are taking a nap? (｡•́︿•̀｡) Please try again, okay?"
      );
    }
  }
  throw new Error(
    "UwU~ Player name can't be empty! Please give your player a super cute name! (✿◕‿◕✿)"
  );
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
