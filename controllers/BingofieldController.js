const Bingofield = require("../models/Bingofield");
const mongoose = require("mongoose");

// Create a new bingofield
async function createBingofield(data) {
  const bingofield = new Bingofield(data);
  return await bingofield.save();
}

// Get all bingofields
async function getBingofields() {
  return await Bingofield.find();
}

// Get a bingofield by ID
async function getBingofieldById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Bingofield.findById(id);
}

// Get bingofields by userId
async function getBingofieldsByUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) return [];
  return await Bingofield.find({ userId });
}

// Get bingofields by gameId
async function getBingofieldsByGame(gameId) {
  if (!mongoose.Types.ObjectId.isValid(gameId)) return [];
  return await Bingofield.find({ gameId });
}

// Update a bingofield by ID
async function updateBingofield(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Bingofield.findByIdAndUpdate(id, data, { new: true });
}

// Delete a bingofield by ID
async function deleteBingofield(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Bingofield.findByIdAndDelete(id);
}

module.exports = {
  createBingofield,
  getBingofields,
  getBingofieldById,
  getBingofieldsByUser,
  getBingofieldsByGame,
  updateBingofield,
  deleteBingofield,
};
