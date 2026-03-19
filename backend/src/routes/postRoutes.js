import express from "express";
import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import fs from "fs";

const router = express.Router();

// ✅ Create uploads folder if not exists
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =====================================================
// ✅ CREATE POST
// =====================================================
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!req.body.caption || !req.body.user) {
      return res.status(400).json({ message: "Caption and user required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const post = new Post({
      image: imageUrl,
      caption: req.body.caption,
      user: req.body.user,
      likes: 0,
      comments: [],
    });

    await post.save();

    res.status(201).json(post);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// =====================================================
// ✅ GET ALL POSTS
// =====================================================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================================================
// ✅ LIKE POST
// =====================================================
router.put("/like/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = post.likes + 1;

    await post.save();

    res.json(post);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// =====================================================
// ✅ COMMENT ON POST
// =====================================================
router.post("/comment/:id", async (req, res) => {
  try {
    if (!req.body.comment) {
      return res.status(400).json({ message: "Comment required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push(req.body.comment);

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================================================
// ✅ DELETE POST
// =====================================================
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================================================
export default router;