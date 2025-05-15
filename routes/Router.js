const express = require("express");
const router = express.Router();

// Import the routes
const echoRoute = require("./Echo.js");
const tilesetsRoute = require("./Tilesets.js");
const bingofieldsRoute = require("./Bingofields.js");
const roomRoute = require("./Room.js");

// Mount the echo route as a subroute
router.use("/echo", echoRoute);
router.use("/tilesets", tilesetsRoute);
router.use("/bingofields", bingofieldsRoute);
router.use("/rooms", roomRoute);

module.exports = router;
