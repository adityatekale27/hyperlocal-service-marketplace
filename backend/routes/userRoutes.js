const express = require("express");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
    res.send("Get all users");
});

// Create a new user
router.post("/", (req, res) => {
    res.send("Create a new user");
});

// Get a specific user by ID
router.get("/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Get user with ID: ${userId}`);
});

// Update a user by ID
router.put("/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Update user with ID: ${userId}`);
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user with ID: ${userId}`);
});

module.exports = router;
