const Room = require("../models/Room");
const mongoose = require("mongoose");

// Create a new room
async function createRoom(data) {
  const { tileset, ruleset, host, maxPlayers } = data;
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = new Date();
  const room = new Room({
    code,
    tileset,
    ruleset,
    host,
    maxPlayers,
    status: "waiting",
    startedAt: timestamp,
  });
  try {
    const savedRoom = await room.save();
    return savedRoom;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Error creating room");
  }
}

// Get a room by ID
async function getRoomById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  try {
    const room = await Room.findById(id)
      .populate("tileset")
      .populate("host")
      .populate("players")
      .populate("bingofields");
    return room;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw new Error("Error fetching room");
  }
}

// Join a room
async function joinRoom(roomId, playerId) {
  if (!mongoose.Types.ObjectId.isValid(roomId)) return null;
  try {
    const room = await Room.findById(roomId);
    if (!room) return null;
    if (room.players.length >= room.maxPlayers) {
      throw new Error("Room is full");
    }
    if (room.players.includes(playerId)) {
      throw new Error("Player already in room");
    }
    // Create a Bingofield for the new player
    const Bingofield = require("../models/Bingofield");
    const tilesetId = room.tileset;
    // Roll a randomly ordered version of the tileset as an array
    const tileset = await require("../models/Tileset").findById(tilesetId);
    if (!tileset) {
      throw new Error("Tileset not found");
    }
    const shuffledTiles = tileset.tiles.sort(() => Math.random() - 0.5);
    const bingofield = new Bingofield({
      tilesetId,
      userId: playerId,
      gameId: null, // Set this if you have a gameId
      tiles: shuffledTiles, // Set this appropriately
      marked: [], // Set this appropriately
      size: tileset.size, // Default size, adjust as needed
    });
    await bingofield.save();
    room.players.push(playerId);
    room.bingofields.push(bingofield._id);
    await room.save();
    return room;
  } catch (error) {
    console.error("Error joining room:", error);
    throw new Error("Error joining room");
  }
}

module.exports = {
  createRoom,
  getRoomById,
  joinRoom,
};
