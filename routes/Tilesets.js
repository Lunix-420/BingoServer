const express = require("express");
const router = express.Router();
const TilesetController = require("../controllers/TilesetController");

// Get all tilesets
router.get("/", async (req, res) => {
  const tilesets = await TilesetController.getTilesets();
  res.json(tilesets);
});

// Create a new tileset
router.post("/", async (req, res) => {
  try {
    const tileset = await TilesetController.createTileset(req.body);
    res.json(tileset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a tileset by ID
router.get("/:id", async (req, res) => {
  const tileset = await TilesetController.getTilesetById(req.params.id);
  if (!tileset)
    return res.status(404).json({
      error: "UwU~ Tileset not found! (✿◕‿◕) Please check your ID nya~",
    });
  res.json(tileset);
});

// Update a tileset by ID
router.put("/:id", async (req, res) => {
  const updated = await TilesetController.updateTileset(
    req.params.id,
    req.body
  );
  if (!updated)
    return res.status(404).json({
      error: "UwU~ Tileset not found! (｡•́︿•̀｡) Please check your ID nya~",
    });
  res.json(updated);
});

// Delete a tileset by ID
router.delete("/:id", async (req, res) => {
  const deleted = await TilesetController.deleteTileset(req.params.id);
  if (!deleted)
    return res.status(404).json({
      error: "UwU~ Tileset not found! (｡•́︿•̀｡) Please check your ID nya~",
    });
  res.json(deleted);
});

// Search tilesets by filter (names, tags, sizes, minRating)
router.post("/search", async (req, res) => {
  // Expects { names: [...], tags: [...], sizes: [...], minRating: int|null } (all nullable)
  const filter = req.body || {};
  const tilesets = await TilesetController.getTilesetsByFilter(filter);
  res.json(tilesets);
});

// Upvote a tileset by ID
router.post("/:id/upvote", async (req, res) => {
  const updated = await TilesetController.upvoteTileset(req.params.id);
  if (!updated)
    return res.status(404).json({
      error: "UwU~ Tileset not found! (｡•́︿•̀｡) Please check your ID nya~",
    });
  res.json(updated);
});

// Downvote a tileset by ID
router.post("/:id/downvote", async (req, res) => {
  const updated = await TilesetController.downvoteTileset(req.params.id);
  if (!updated)
    return res.status(404).json({
      error: "UwU~ Tileset not found! (｡•́︿•̀｡) Please check your ID nya~",
    });
  res.json(updated);
});

module.exports = router;
