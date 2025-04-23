class TileSet {
  constructor(name, size, tags, tiles) {
    this.name = name;
    this.size = size;
    this.tags = tags;
    this.tiles = tiles;
  }
}

// Example TileSets
const fruitsTileSet = new TileSet(
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
);

const animalsTileSet = new TileSet(
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
);

module.exports = { TileSet, fruitsTileSet, animalsTileSet };
