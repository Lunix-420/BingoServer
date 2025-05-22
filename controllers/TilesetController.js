const Tileset = require("../models/Tileset");
const mongoose = require("mongoose");

// Create a new tileset
async function createTileset(data) {
  // Make sure the amount of tiles is size * size
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
  // filter: { names: [string]|null, tags: [string]|null, sizes: [number]|null, minRating: number|null, minPlays: number|null, sort: {field: string, order: "asc"|"desc"}|null }
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
  if (typeof filter.minRating === "number") {
    query.rating = { ...(query.rating || {}), $gte: filter.minRating };
  }
  if (typeof filter.minPlays === "number") {
    query.plays = { ...(query.plays || {}), $gte: filter.minPlays };
  }

  let sort = {};
  if (filter.sort && typeof filter.sort === "object") {
    const allowedFields = ["name", "size", "rating", "createdAt", "plays"];
    const field = allowedFields.includes(filter.sort.field)
      ? filter.sort.field
      : "createdAt";
    const order = filter.sort.order === "asc" ? 1 : -1;
    sort[field] = order;
  }

  // If query is empty, return all tilesets (with sort if provided)
  if (Object.keys(query).length === 0) {
    return await Tileset.find().sort(sort);
  }
  return await Tileset.find(query).sort(sort);
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

// Upvote a tileset by ID
async function upvoteTileset(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Tileset.findByIdAndUpdate(
    id,
    { $inc: { rating: 1 } },
    { new: true }
  );
}

// Downvote a tileset by ID
async function downvoteTileset(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Tileset.findByIdAndUpdate(
    id,
    { $inc: { rating: -1 } },
    { new: true }
  );
}

module.exports = {
  createTileset,
  getTilesets,
  getTilesetById,
  getTilesetsByFilter,
  updateTileset,
  deleteTileset,
  upvoteTileset,
  downvoteTileset,
};
