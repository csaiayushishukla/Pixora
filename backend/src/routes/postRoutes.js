import express from "express";
import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import fs from "fs";

const router = express.Router();

// ✅ CREATE uploads folder path
const uploadPath = path.join(process.cwd(), "uploads");

// ✅ CREATE folder automatically if not exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ MULTER STORAGE (FINAL FIX)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ fixed path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ CREATE POST
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // ❌ No image
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ❌ Missing fields
    if (!req.body.caption || !req.body.user) {
      return res.status(400).json({ message: "Caption and user required" });
    }

    // ❌ Invalid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // ✅ Image URL
    const imageUrl = `/uploads/${req.file.filename}`;

    // ✅ Create post
    const post = new Post({
      image: imageUrl,
      caption: req.body.caption,
      user: req.body.user,
    });

    await post.save();

    res.status(201).json(post);

  } catch (err) {
    console.log("🔥 ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ EXPORT
export default router;