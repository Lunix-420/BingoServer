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
    res.status(201).json(room._id);
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

// Get rooms ID from a code
router.get("/id/:code", async (req, res) => {
  const { code } = req.params;
  console.log(`Received request to get room ID from code: ${code}`);
  try {
    const room = await RoomController.getRoomIdFromCode(code);
    if (!room) {
      return res.status(404).json({
        error:
          "Nyaa~! I couldn't find a room with that code! Please check the code and try again! (｡•́︿•̀｡)",
      });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start a room
router.post("/:id/start", async (req, res) => {
  try {
    const room = await RoomController.startRoom(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Remove a player from a room
router.post("/:id/leave", async (req, res) => {
  try {
    const { player } = req.body;
    const room = await RoomController.leaveRoom(req.params.id, player);
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
