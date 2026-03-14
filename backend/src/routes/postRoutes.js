const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const uploadFile = require("../utils/imagekit");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image required" });
    const result = await uploadFile(req.file.buffer);
    const post = await Post.create({
      caption: req.body.caption,
      image: result.url
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;