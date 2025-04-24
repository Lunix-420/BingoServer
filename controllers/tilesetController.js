const Tileset = require("../models/Tileset");

// Create a new tileset
async function createTileset(data) {
  const tileset = new Tileset(data);
  return await tileset.save();
}

// Get all tilesets
async function getTilesets() {
  return await Tileset.find();
}

// Get a tileset by ID
async function getTilesetById(id) {
  return await Tileset.findById(id);
}

// Update a tileset by ID
async function updateTileset(id, data) {
  return await Tileset.findByIdAndUpdate(id, data, { new: true });
}

// Delete a tileset by ID
async function deleteTileset(id) {
  return await Tileset.findByIdAndDelete(id);
}

module.exports = {
  createTileset,
  getTilesets,
  getTilesetById,
  updateTileset,
  deleteTileset,
};
