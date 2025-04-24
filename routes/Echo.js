const express = require("express");
const router = express.Router();

router.get("/:param", (req, res) => {
  const { param } = req.params;
  res.send({ echoedParam: param });
});

module.exports = router;
