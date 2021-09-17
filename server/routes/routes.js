const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Server running on ${process.env.PORT || 3000}`);
});

module.exports = router;
