const express = require("express");

const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      user: req.user.id,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/comment/:id",
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(
        req.params.id
      );

      post.comments.push({
        user: req.user.username,
        text: req.body.text,
      });

      await post.save();

      res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;