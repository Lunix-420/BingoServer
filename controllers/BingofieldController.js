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

// Mark a tile on a bingofield (single or all in room)
async function markTile({ playerId, bingofieldId, tileIndex }) {
  // Dummy rule: if true, mark on all fields in the room
  const isGlobalMarking = false; // Set to true for global marking ("GLOBAL_MARK_ON_ALL_FIELDS")
  const Bingofield = require("../models/Bingofield");
  const Room = require("../models/Room");

  if (!mongoose.Types.ObjectId.isValid(bingofieldId)) return null;
  const bingofield = await Bingofield.findById(bingofieldId);
  if (!bingofield) return null;

  if (!isGlobalMarking) {
    // Routine A: Mark only on this player's field
    if (!bingofield.userId.equals(playerId)) return null;
    if (
      !Array.isArray(bingofield.marked) ||
      tileIndex < 0 ||
      tileIndex >= bingofield.marked.length
    )
      return null;
    bingofield.marked[tileIndex] = true;
    await bingofield.save();
    return [bingofield];
  } else {
    // Routine B: Mark on all fields in the same room (GLOBAL_MARK_ON_ALL_FIELDS)
    // Find the room containing this bingofield
    const room = await Room.findOne({ bingofields: bingofield._id });
    if (!room) return null;
    // Update all bingofields in the room
    const updatedFields = [];
    for (const fieldId of room.bingofields) {
      const field = await Bingofield.findById(fieldId);
      if (
        field &&
        Array.isArray(field.marked) &&
        tileIndex >= 0 &&
        tileIndex < field.marked.length
      ) {
        field.marked[tileIndex] = true;
        await field.save();
        updatedFields.push(field);
      }
    }
    return updatedFields;
  }
}

module.exports = {
  createBingofield,
  getBingofields,
  getBingofieldById,
  getBingofieldsByUser,
  getBingofieldsByGame,
  updateBingofield,
  deleteBingofield,
  markTile,
};
