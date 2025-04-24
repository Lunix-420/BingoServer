const express = require("express");
const router = express.Router();

// Import the routes
const echoRoute = require("./Echo.js");
const tilesetsRoute = require("./Tilesets.js");

// Mount the echo route as a subroute
router.use("/echo", echoRoute);
router.use("/tilesets", tilesetsRoute);

module.exports = router;
