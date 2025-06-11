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
async function markTile(playerId, bingofieldId, tileIndex) {
  // Dummy rule: if true, mark on all fields in the room
  const isGlobalMarking = false; // Set to true for global marking ("GLOBAL_MARK_ON_ALL_FIELDS")
  const Bingofield = require("../models/Bingofield");
  const Room = require("../models/Room");

  console.log(
    `Marking tile ${tileIndex} on bingofield ${bingofieldId} for player ${playerId}`
  );

  if (!mongoose.Types.ObjectId.isValid(bingofieldId)) {
    throw new Error(
      "Oh noes! Invalid Bingofield ID! (｡•́︿•̀｡) Please check your ID nya~"
    );
  }
  const bingofield = await Bingofield.findById(bingofieldId);
  if (!bingofield) {
    throw new Error(
      "UwU~ Bingofield not found! (✿◕‿◕) Please check your ID nya~"
    );
  }

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
function checkBingoWinner(markedTiles, boardSize) {
  // Check rows
  for (let row = 0; row < boardSize; row++) {
    let isRowWinner = true;
    for (let column = 0; column < boardSize; column++) {
      if (!markedTiles[row * boardSize + column]) {
        isRowWinner = false;
        break;
      }
    }
    if (isRowWinner) return true;
  }
  // Check columns
  for (let column = 0; column < boardSize; column++) {
    let isColumnWinner = true;
    for (let row = 0; row < boardSize; row++) {
      if (!markedTiles[row * boardSize + column]) {
        isColumnWinner = false;
        break;
      }
    }
    if (isColumnWinner) return true;
  }
  // Check main diagonal
  let isMainDiagonalWinner = true;
  for (let index = 0; index < boardSize; index++) {
    if (!markedTiles[index * boardSize + index]) {
      isMainDiagonalWinner = false;
      break;
    }
  }
  if (isMainDiagonalWinner) return true;
  // Check anti-diagonal
  let isAntiDiagonalWinner = true;
  for (let index = 0; index < boardSize; index++) {
    if (!markedTiles[index * boardSize + (boardSize - 1 - index)]) {
      isAntiDiagonalWinner = false;
      break;
    }
  }
  if (isAntiDiagonalWinner) return true;

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
