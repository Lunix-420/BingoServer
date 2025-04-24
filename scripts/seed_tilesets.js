// Usage: node scripts/seed_tilesets.js
require("dotenv").config();
const mongoose = require("mongoose");
const Tileset = require("../models/Tileset");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bingo";

async function seed() {
  await mongoose.connect(MONGO_URI);

  const animalsTileset = {
    size: 4,
    tiles: [
      "Cat",
      "Dog",
      "Hamster",
      "Mouse",
      "Lizard",
      "Snake",
      "Frog",
      "Turtle",
      "Parrot",
      "Eagle",
      "Penguin",
      "Dolphin",
      "Horse",
      "Cow",
      "Sheep",
      "Pig",
    ],
    tags: ["animals", "nature", "wildlife", "example"],
  };

  try {
    await Tileset.deleteMany({ tags: "example" });
    const created = await Tileset.create(animalsTileset);
    console.log("Seeded tileset:", created);
  } catch (err) {
    console.error("Error seeding tileset:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
