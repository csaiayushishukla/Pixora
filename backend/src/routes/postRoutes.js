import express from "express";
import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose"; // ✅ HERE

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// CREATE POST
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!req.body.caption || !req.body.user) {
      return res.status(400).json({ message: "Caption and user required" });
    }

    // ✅ check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const post = new Post({
      image: imageUrl,
      caption: req.body.caption,
      user: req.body.user,
    });

    await post.save();

    res.status(201).json(post);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// export
export default router;