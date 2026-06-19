const express = require("express");

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/profile/:id",
  async (req, res) => {
    try {
      const user = await User.findById(
        req.params.id
      ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.put(
  "/follow/:id",
  auth,
  async (req, res) => {
    try {
      const userToFollow =
        await User.findById(req.params.id);

      const currentUser =
        await User.findById(req.user.id);

      if (
        !userToFollow.followers.includes(
          req.user.id
        )
      ) {
        userToFollow.followers.push(
          req.user.id
        );

        currentUser.following.push(
          req.params.id
        );

        await userToFollow.save();
        await currentUser.save();
      }

      res.json({
        message: "User Followed",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.put(
  "/unfollow/:id",
  auth,
  async (req, res) => {
    try {
      const userToUnfollow =
        await User.findById(req.params.id);

      const currentUser =
        await User.findById(req.user.id);

      userToUnfollow.followers =
        userToUnfollow.followers.filter(
          (id) => id.toString() !== req.user.id
        );

      currentUser.following =
        currentUser.following.filter(
          (id) =>
            id.toString() !== req.params.id
        );

      await userToUnfollow.save();
      await currentUser.save();

      res.json({
        message: "User Unfollowed",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;