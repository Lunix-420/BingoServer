const express = require("express");
const router = express.Router();

// Import the routes
const echoRoute = require("./Echo.js");

// Mount the echo route as a subroute
router.use("/echo", echoRoute);

module.exports = router;
