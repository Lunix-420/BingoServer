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
    ) {
      return null;
    }

    // Mark the tile
    bingofield.marked[tileIndex] = true;

    // Check for winner
    const isWinner = checkBingoWinner(bingofield.marked, bingofield.size);
    bingofield.isWinner = isWinner;

    // Save the updated bingofield
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
        // Mark the tile
        field.marked[tileIndex] = true;

        // Check for winner
        const isWinner = checkBingoWinner(field.marked, field.size);
        field.isWinner = isWinner;

        // Save the updated field
        await field.save();
        updatedFields.push(field);
      }
    }
    return updatedFields;
  }
}

//====================================================================================================
// Helper: Check if a Bingofield is a winner (row, column, diagonal)
function checkBingoWinner(marked, size) {
  // Check rows
  for (let r = 0; r < size; r++) {
    let rowWin = true;
    for (let c = 0; c < size; c++) {
      if (!marked[r * size + c]) {
        rowWin = false;
        break;
      }
    }
    if (rowWin) return true;
  }
  // Check columns
  for (let c = 0; c < size; c++) {
    let colWin = true;
    for (let r = 0; r < size; r++) {
      if (!marked[r * size + c]) {
        colWin = false;
        break;
      }
    }
    if (colWin) return true;
  }
  // Check main diagonal
  let diag1Win = true;
  for (let i = 0; i < size; i++) {
    if (!marked[i * size + i]) {
      diag1Win = false;
      break;
    }
  }
  if (diag1Win) return true;
  // Check anti-diagonal
  let diag2Win = true;
  for (let i = 0; i < size; i++) {
    if (!marked[i * size + (size - 1 - i)]) {
      diag2Win = false;
      break;
    }
  }
  if (diag2Win) return true;

  return false;
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
