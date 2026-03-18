const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const uploadFile = require("../utils/imagekit");

// TEMP STORAGE
let posts = [];

// GET POSTS
router.get("/", (req, res) => {
  res.json(posts);
});

// CREATE POST
router.post("/", (req, res) => {
  const { caption, image } = req.body;

  const newPost = {
    _id: Date.now(),
    user: "Ayush",
    caption,
    image,
  };

  posts.unshift(newPost);

  res.json(newPost);
});

// UPLOAD IMAGE
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadFile(req.file.buffer);

    res.json({ url: result.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;