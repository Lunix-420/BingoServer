const express = require("express");
const router = express.Router();

// Import the routes
const echoRoute = require("./Echo.js");
const tilesetsRoute = require("./Tilesets.js");
const bingofieldsRoute = require("./Bingofields.js");

// Mount the echo route as a subroute
router.use("/echo", echoRoute);
router.use("/tilesets", tilesetsRoute);
router.use("/bingofields", bingofieldsRoute);

module.exports = router;
