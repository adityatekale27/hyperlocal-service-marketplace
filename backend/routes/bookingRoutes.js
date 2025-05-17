const express = require("express");
const router = express.Router();

// Get all bookings
router.get("/", (req, res) => {
    res.send("Get all bookings");
});

// Create a new booking
router.post("/", (req, res) => {
    res.send("Create a new booking");
});

// Get a specific booking by ID
router.get("/:id", (req, res) => {
    const bookingId = req.params.id;
    res.send(`Get booking with ID: ${bookingId}`);
});

// Update a booking by ID
router.put("/:id", (req, res) => {
    const bookingId = req.params.id;
    res.send(`Update booking with ID: ${bookingId}`);
});

// Delete a booking by ID
router.delete("/:id", (req, res) => {
    const bookingId = req.params.id;
    res.send(`Delete booking with ID: ${bookingId}`);
});

module.exports = router;
