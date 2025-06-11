const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await RoomController.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new room
router.post("/", async (req, res) => {
  try {
    const room = await RoomController.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await RoomController.getRoomById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join a room
router.post("/:id/join", async (req, res) => {
  try {
    const { player } = req.body;
    const room = await RoomController.joinRoom(req.params.id, player);
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
