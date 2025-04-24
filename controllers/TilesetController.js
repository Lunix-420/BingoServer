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

// Get a list of tilesets by name
async function getTilesetsByName(name) {
  return await Tileset.find({ name: new RegExp(name, "i") });
}

// Get a list of tilesets by tag
async function getTilesetsByTag(tag) {
  return await Tileset.find({ tags: tag });
}

// Get a list of tilesets by size
async function getTilesetsBySize(size) {
  return await Tileset.find({ size });
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
  getTilesetsByName,
  getTilesetsByTag,
  getTilesetsBySize,
  updateTileset,
  deleteTileset,
};
