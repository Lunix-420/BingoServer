const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send({ echoedData: req.body });
});

module.exports = router;

