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
      image: result.url
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
// ✅ LIKE POST
// =====================
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Post liked",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =====================
// ✅ ADD COMMENT
// =====================
router.post("/comment/:id", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ text });

    await post.save();

    res.json({
      message: "Comment added",
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
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;