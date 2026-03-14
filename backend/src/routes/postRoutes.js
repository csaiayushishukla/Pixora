const express = require("express");
const router = express.Router();

// GET posts
router.get("/", async (req, res) => {
  res.json([]);
});

// POST post
router.post("/", (req, res) => {
  res.json({
    message: "POST route working"
  });
});

module.exports = router;