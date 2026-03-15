const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const Post = require("../models/postModel");
const uploadFile = require("../utils/imagekit");

router.post("/", upload.single("image"), async (req, res) => {
  try {

    const result = await uploadFile(req.file.buffer);

    const newPost = new Post({
      caption: req.body.caption,
      image: result.url
    });

    await newPost.save();

    res.json(newPost);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = router;