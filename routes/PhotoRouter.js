const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get("/photosOfUser/:id", async (req, res) => {
  const userId = req.params.id;
  
  try {
    const userExists = await User.findById(userId).exec();
    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const photos = await Photo.find({ user_id: userId }).exec();
    const photosWithDetails = await Promise.all(

      photos.map(async (photo) => {
        const photoObject = {
          _id: photo._id,
          user_id: photo.user_id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          comments: []
        };

        if (photo.comments && photo.comments.length > 0) {
          photoObject.comments = await Promise.all(
            photo.comments.map(async (comment) => {
              const commentUser = await User.findById(
                comment.user_id,
                "_id first_name last_name"
              ).exec();

              return {
                _id: comment._id,
                comment: comment.comment,
                date_time: comment.date_time,
                user: commentUser ? {
                  _id: commentUser._id,
                  first_name: commentUser.first_name,
                  last_name: commentUser.last_name
                } : null
              };
            })
          );
        }

        return photoObject;
      })
    );

    res.status(200).json(photosWithDetails);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(400).json({ error: "Invalid user ID" });
  }
});

module.exports = router;
