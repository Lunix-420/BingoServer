const express = require("express");
const router = express.Router();

// Import the routes
const echoRoute = require("./Echo.js");
const tilesetsRoute = require("./Tilesets.js");
const bingofieldsRoute = require("./Bingofields.js");
const roomRoute = require("./Room.js");
const playerRoute = require("./Player.js");

// Mount the echo route as a subroute
router.use("/echo", echoRoute);
router.use("/tilesets", tilesetsRoute);
router.use("/bingofields", bingofieldsRoute);
router.use("/rooms", roomRoute);
router.use("/players", playerRoute);

// Handle 404 for unmatched routes
router.use((req, res) => {
  res.status(404).json({
    error:
      "UwU~! Oopsie! The page you’re looking for has gone on a magical adventure and can’t be found! (｡•́︿•̀｡) Please check the URL, nya~",
  });
});

// Handle errors globally
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error:
      "UwU~! Something went wrong... The server tripped over its own feet! (｡•́︿•̀｡) Please try again later, nya~",
  });
});

module.exports = router;
