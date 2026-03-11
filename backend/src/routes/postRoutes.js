const express = require('express');
const multer = require('multer');
const Post = require('../models/postModel');
const uploadFile = require('../utils/imageKit');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    if (req.file) {
      const uploaded = await uploadFile(req.file.buffer);
      imageUrl = uploaded.url;
    }

    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: imageUrl
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
