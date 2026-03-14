const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET POSTS
router.get("/", async (req, res) => {
  res.json([]);
});

// CREATE POST
router.post("/", upload.single("image"), async (req, res) => {

  const caption = req.body.caption;

  res.json({
    message: "POST route working",
    caption: caption
  });

});

module.exports = router;