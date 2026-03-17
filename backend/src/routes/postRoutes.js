const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const Post = require("../models/postModel");
const uploadFile = require("../utils/imagekit");


// =====================
// ✅ CREATE POST
// =====================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadFile(req.file.buffer);

    const newPost = new Post({
      caption: req.body.caption,
      image: result.url,
      likes: 0   // ✅ ensure default
    });

    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =====================
// ✅ GET ALL POSTS
// =====================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =====================
// ✅ LIKE POST (FINAL FIX)
// =====================
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },   // 🔥 best method
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Liked successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =====================
// ✅ DELETE POST
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;