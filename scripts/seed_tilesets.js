// Usage: node scripts/seed_tilesets.js
require("dotenv").config();
const mongoose = require("mongoose");
const Tileset = require("../models/Tileset");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:42069/bingo";

async function seed() {
  await mongoose.connect(MONGO_URI);

  const animalsTileset = {
    name: "Animals",
    description: "A collection of various animals.",
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

  const plantsTileset = {
    name: "Plants",
    description: "A collection of various plants.",
    size: 4,
    tiles: [
      "Rose",
      "Tulip",
      "Daisy",
      "Sunflower",
      "Cactus",
      "Fern",
      "Bamboo",
      "Palm Tree",
      "Oak Tree",
      "Pine Tree",
      "Maple Tree",
      "Willow Tree",
      "Cherry Blossom",
      "Lavender",
      "Orchid",
      "Dandelion",
    ],
    tags: ["plants", "nature", "flora", "example"],
  };

  const programmingLanguagesTileset = {
    name: "Programming Languages",
    description: "A collection of various programming languages.",
    size: 3,
    tiles: [
      "C",
      "Rust",
      "Python",
      "C++",
      "Java",
      "JavaScript",
      "Go",
      "Bash",
      "Haskell",
    ],
    tags: ["programming", "languages", "technology", "example", "coding"],
  };

  try {
    await Tileset.deleteMany({ tags: "example" });
    const created = await Tileset.create([
      animalsTileset,
      plantsTileset,
      programmingLanguagesTileset,
    ]);
    console.log("Seeded tilesets:", created);
  } catch (err) {
    console.error("Error seeding tilesets:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
