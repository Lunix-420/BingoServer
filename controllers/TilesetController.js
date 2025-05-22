const Tileset = require("../models/Tileset");
const mongoose = require("mongoose");

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
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Tileset.findById(id);
}

// Get tilesets by flexible filter
async function getTilesetsByFilter(filter) {
  // filter: { names: [string]|null, tags: [string]|null, sizes: [number]|null }
  const query = {};

  if (filter.names && Array.isArray(filter.names) && filter.names.length > 0) {
    query.name = { $in: filter.names };
  }
  if (filter.tags && Array.isArray(filter.tags) && filter.tags.length > 0) {
    query.tags = { $in: filter.tags };
  }
  if (filter.sizes && Array.isArray(filter.sizes) && filter.sizes.length > 0) {
    query.size = { $in: filter.sizes };
  }

  // If query is empty, return all tilesets
  if (Object.keys(query).length === 0) {
    return await Tileset.find();
  }
  return await Tileset.find(query);
}

// Update a tileset by ID
async function updateTileset(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Tileset.findByIdAndUpdate(id, data, { new: true });
}

// Delete a tileset by ID
async function deleteTileset(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Tileset.findByIdAndDelete(id);
}

module.exports = {
  createTileset,
  getTilesets,
  getTilesetById,
  getTilesetsByFilter,
  updateTileset,
  deleteTileset,
};
