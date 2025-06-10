const express = require("express");
const router = express.Router();
const PlayerController = require("../controllers/PlayerController");

// Get all players
router.get("/", async (req, res) => {
  const players = await PlayerController.getPlayers();
  res.json(players);
});

// Create a new player
router.post("/", async (req, res) => {
  try {
    const player = await PlayerController.createPlayer(req.body);
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a player by ID
router.get("/:id", async (req, res) => {
  const player = await PlayerController.getPlayerById(req.params.id);
  if (!player)
    return res.status(404).json({ error: "Player not found or invalid ID" });
  res.json(player);
});

// Update a player by ID
router.put("/:id", async (req, res) => {
  const updated = await PlayerController.updatePlayer(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ error: "Player not found or invalid ID" });
  res.json(updated);
});

// Delete a player by ID
router.delete("/:id", async (req, res) => {
  const deleted = await PlayerController.deletePlayer(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Player not found or invalid ID" });
  res.json(deleted);
});

module.exports = router;
