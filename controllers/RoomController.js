const Room = require("../models/Room");
const mongoose = require("mongoose");

// Create a new room
async function createRoom(data) {
  // Check required fields with kawaii anime error messages
  if (!("tileset" in data)) {
    throw new Error(
      "UwU~! You forgot to add the tileset! Please include it so we can play together! (✿◕‿◕)"
    );
  }
  if (!("host" in data)) {
    throw new Error(
      "UwU~! You forgot to add the host! Please tell me who is hosting the room! (｡•́︿•̀｡)"
    );
  }

  // Extract required fields
  const tileset = data.tileset;
  const host = data.host;

  // Generate code
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Build roomData with only provided optional fields
  const roomData = {
    code,
    tileset,
    host,
  };

  // Optional fields
  if ("isPublic" in data) roomData.isPublic = data.isPublic;
  if ("isVersus" in data) roomData.isVersus = data.isVersus;
  if ("status" in data) roomData.status = data.status;
  if ("maxPlayers" in data) roomData.maxPlayers = data.maxPlayers;
  if ("startedAt" in data) roomData.startedAt = data.startedAt;
  if ("endedAt" in data) roomData.endedAt = data.endedAt;
  if ("players" in data) roomData.players = data.players;
  if ("bingofields" in data) roomData.bingofields = data.bingofields;

  try {
    const room = new Room(roomData);
    const savedRoom = await room.save();
    return savedRoom;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error(
      "Nyaa~! I couldn't create the room! Maybe the bingo spirits are taking a nap? (｡•́︿•̀｡) Please try again, okay?"
    );
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
    throw new Error(
      "Nyaa~! I couldn't find the room you were looking for! Maybe it ran away? (｡•́︿•̀｡) Please try again!"
    );
  }
}

// Join a room
async function joinRoom(roomId, playerId) {
  if (!mongoose.Types.ObjectId.isValid(roomId)) return null;
  if (!mongoose.Types.ObjectId.isValid(playerId)) return null;
  try {
    const room = await Room.findById(roomId).populate("tileset");
    if (!room) return null;
    if (room.players.length >= room.maxPlayers) {
      throw new Error(
        "Oh noes! The room is already full! There's no more space for new friends right now~ (｡•́︿•̀｡) Please try another room, okay?"
      );
    }
    if (room.players.some((p) => p.toString() === playerId.toString())) {
      throw new Error(
        "UwU~! You're already in this room! Let's play together, nya~! (≧◡≦) ♡"
      );
    }

    // Create a Bingofield for the new player
    const Bingofield = require("../models/Bingofield");
    const tileset = room.tileset;
    if (!tileset) {
      throw new Error(
        "Nyaa~! The tileset is missing! I can't make a bingo card without it! (｡•́︿•̀｡) Please try again, okay?"
      );
    }

    // Shuffle tiles
    const shuffledTiles = [...tileset.tiles].sort(() => Math.random() - 0.5);

    const bingofield = new Bingofield({
      tilesetId: tileset._id,
      userId: playerId,
      tiles: shuffledTiles,
      marked: [],
      size: tileset.size,
    });
    await bingofield.save();

    room.players.push(playerId);
    room.bingofields.push(bingofield._id);
    await room.save();

    return room._id;
  } catch (error) {
    console.error("Error joining room:", error);
    throw new Error(
      "UwU~! I couldn't add you to the room! Maybe the bingo fairies are sleepy? (｡•́︿•̀｡) Please try again!"
    );
  }
}

module.exports = {
  createRoom,
  getRoomById,
  joinRoom,
};
