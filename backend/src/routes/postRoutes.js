import express from "express";
import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ✅ CREATE POST
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;

    const post = new Post({
      image: imageUrl,
      caption: req.body.caption,
      user: req.body.user,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ MUST HAVE THIS
export default router;