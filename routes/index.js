const express = require('express');
const router = express.Router();

// Import the echo route
const echoRoute = require('./echo');

// Define the root route
router.get('/', (req, res) => {
  res.send('Hello from Express');
});

// Mount the echo route as a subroute
router.use('/echo', echoRoute);

module.exports = router;

