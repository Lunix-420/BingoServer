const express = require("express");
const router = express.Router();
const BingofieldController = require("../controllers/BingofieldController");

// Get all bingofields
router.get("/", async (req, res) => {
  const bingofields = await BingofieldController.getBingofields();
  res.json(bingofields);
});

// Create a new bingofield
router.post("/", async (req, res) => {
  const bingofield = await BingofieldController.createBingofield(req.body);
  res.json(bingofield);
});

// Get a bingofield by ID
router.get("/:id", async (req, res) => {
  const bingofield = await BingofieldController.getBingofieldById(
    req.params.id
  );
  if (!bingofield)
    return res.status(404).json({
      error: "UwU~ Bingofield not found! (✿◕‿◕) Please check your ID nya~",
    });
  res.json(bingofield);
});

// Delete a bingofield by ID
router.delete("/:id", async (req, res) => {
  const deleted = await BingofieldController.deleteBingofield(req.params.id);
  if (!deleted)
    return res.status(404).json({
      error: "UwU~ Bingofield not found! (｡•́︿•̀｡) Please check your ID nya~",
    });
  res.json(deleted);
});

// Mark a tile on a bingofield (single or all in room)
router.post("/:id/mark", async (req, res) => {
  const { player, tile } = req.body;
  const bingofield = req.params.id;
  if (!player || !bingofield || typeof tile !== "number") {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(
    `Rquest marking tile ${tile} on bingofield ${bingofield} for player ${player}`
  );
  try {
    const result = await BingofieldController.markTile(
      player,
      bingofield,
      tile
    );
    if (!result)
      return res.status(404).json({
        error:
          "UwU~ Bingofield or Room not found, or invalid request! (｡•́︿•̀｡) Please check your info nya~",
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
