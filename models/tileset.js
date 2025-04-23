class TileSet {
  constructor(name, size, tags, tiles) {
    this.name = typeof name === "string" ? name : "";
    this.size = [3, 4, 5, 6].includes(size) ? size : 3;
    this.tags =
      Array.isArray(tags) && tags.every((tag) => typeof tag === "string")
        ? tags
        : [];
    this.tiles =
      Array.isArray(tiles) && tiles.every((tile) => typeof tile === "string")
        ? tiles
        : [];
    // Ensure the number of tiles matches size squared
    if (this.tiles.length !== this.size * this.size) {
      throw new Error(
        `The number of tiles (${this.tiles.length}) must equal size squared (${
          this.size * this.size
        }).`
      );
    }
  }
}

module.exports = TileSet;
