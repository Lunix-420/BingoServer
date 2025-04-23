const TileSet = require("./TileSet");

class BingoField {
  constructor(tileSet) {
    if (!(tileSet instanceof TileSet)) {
      throw new Error("tileSet must be an instance of TileSet");
    }

    this.tileSet = tileSet;
    this.size = tileSet.size; // Use the size from the TileSet
    this.grid = this.generateGrid();
  }

  // Generate a Bingo grid based on the TileSet
  generateGrid() {
    const { tiles, size } = this.tileSet;

    if (tiles.length < size * size) {
      throw new Error("Not enough tiles in the TileSet to fill the BingoField");
    }

    // Shuffle the tiles and create a grid
    const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid.push(shuffledTiles.slice(i * size, (i + 1) * size));
    }
    return grid;
  }

  // Get the Bingo grid
  getGrid() {
    return this.grid;
  }
}

module.exports = BingoField;
