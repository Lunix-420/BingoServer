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
    return res
      .status(404)
      .json({ error: "Bingofield not found or invalid ID" });
  res.json(bingofield);
});

// Update a bingofield by ID
router.put("/:id", async (req, res) => {
  const updated = await BingofieldController.updateBingofield(
    req.params.id,
    req.body
  );
  if (!updated)
    return res
      .status(404)
      .json({ error: "Bingofield not found or invalid ID" });
  res.json(updated);
});

// Delete a bingofield by ID
router.delete("/:id", async (req, res) => {
  const deleted = await BingofieldController.deleteBingofield(req.params.id);
  if (!deleted)
    return res
      .status(404)
      .json({ error: "Bingofield not found or invalid ID" });
  res.json(deleted);
});

// Get bingofields by userId
router.get("/search/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const bingofields = await BingofieldController.getBingofieldsByUser(userId);
  res.json(bingofields);
});

// Get bingofields by gameId
router.get("/search/game/:gameId", async (req, res) => {
  const { gameId } = req.params;
  const bingofields = await BingofieldController.getBingofieldsByGame(gameId);
  res.json(bingofields);
});

module.exports = router;
