// Usage: node scripts/seed_bingofields.js
require("dotenv").config();
const mongoose = require("mongoose");
const Bingofield = require("../models/Bingofield");
const Tileset = require("../models/Tileset");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bingo";

function shuffle(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Use a known tileset (e.g., "Animals")
  const tileset = await Tileset.findOne({ name: "Animals" });
  if (!tileset) {
    console.error("No 'Animals' tileset found. Seed tilesets first!");
    process.exit(1);
  }

  // Fake user and game IDs (replace with real ones later)
  const fakeUserId = new mongoose.Types.ObjectId();
  const fakeGameId = new mongoose.Types.ObjectId();

  // Randomize tiles
  const shuffledTiles = shuffle([...tileset.tiles]);
  const marked = Array(tileset.size * tileset.size).fill(false);

  const bingofield = {
    tilesetId: tileset._id,
    userId: fakeUserId,
    gameId: fakeGameId,
    tiles: shuffledTiles,
    marked,
    size: tileset.size,
    isWinner: false,
    completedAt: null,
  };

  try {
    // Remove Bingofields for this fake user for easy reseeding
    await Bingofield.deleteMany({ userId: fakeUserId });
    const created = await Bingofield.create(bingofield);
    console.log("Seeded Bingofield:", created);
  } catch (err) {
    console.error("Error seeding Bingofield:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
