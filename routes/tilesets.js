const express = require("express");
const router = express.Router();
const TileSet = require("../models/TileSet");

// Route to query TileSets
router.get("/", (req, res) => {
  // TODO: Replace with actual database query
  const exampleTileSets = [
    new TileSet(
      "Fruits",
      4,
      ["food", "nature"],
      [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Honeydew",
        "Kiwi",
        "Lemon",
        "Mango",
        "Nectarine",
        "Orange",
        "Papaya",
        "Quince",
        "Raspberry",
      ]
    ),
    new TileSet(
      "Animals",
      3,
      ["nature", "wildlife"],
      [
        "Cat",
        "Dog",
        "Snake",
        "Lizard",
        "Elephant",
        "Horse",
        "Monkey",
        "Frog",
        "Fish",
      ]
    ),
  ];

  res.json(exampleTileSets);
});

module.exports = router;
