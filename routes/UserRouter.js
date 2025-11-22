const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// API 1: /user/list 
router.get("/list", async (req, res) => {
    try {
        const users = await User.find({}, "_id first_name last_name").exec();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API 2: /user/:id 
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId, "_id first_name last_name location description occupation").exec();

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(400).json({ error: "Invalid user ID" });
    }
});

module.exports = router;