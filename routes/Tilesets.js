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
  const tileset = await TilesetController.createTileset(req.body);
  res.json(tileset);
});

// Get a tileset by ID
router.get("/:id", async (req, res) => {
  const tileset = await TilesetController.getTilesetById(req.params.id);
  if (!tileset)
    return res.status(404).json({ error: "Tileset not found or invalid ID" });
  res.json(tileset);
});

// Update a tileset by ID
router.put("/:id", async (req, res) => {
  const updated = await TilesetController.updateTileset(
    req.params.id,
    req.body
  );
  if (!updated)
    return res.status(404).json({ error: "Tileset not found or invalid ID" });
  res.json(updated);
});

// Delete a tileset by ID
router.delete("/:id", async (req, res) => {
  const deleted = await TilesetController.deleteTileset(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Tileset not found or invalid ID" });
  res.json(deleted);
});

// Search tilesets by name (case-insensitive, partial match)
router.get("/search/name/:name", async (req, res) => {
  const { name } = req.params;
  const tilesets = await TilesetController.getTilesetsByName(name);
  res.json(tilesets);
});

// Search tilesets by tag (exact match)
router.get("/search/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  const tilesets = await TilesetController.getTilesetsByTag(tag);
  res.json(tilesets);
});

// Search tilesets by size (exact match)
router.get("/search/size/:size", async (req, res) => {
  const { size } = req.params;
  const tilesets = await TilesetController.getTilesetsBySize(size);
  res.json(tilesets);
});

module.exports = router;
