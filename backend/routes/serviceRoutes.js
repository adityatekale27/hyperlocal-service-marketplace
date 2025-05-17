const express = require("express");
const router = express.Router();

// Get all services
router.get("/", (req, res) => {
    res.send("Get all services");
});

// Create a new service
router.post("/", (req, res) => {
    res.send("Create a new service");
});

// Get a specific service by ID
router.get("/:id", (req, res) => {
    const serviceId = req.params.id;
    res.send(`Get service with ID: ${serviceId}`);
});

// Update a service by ID
router.put("/:id", (req, res) => {
    const serviceId = req.params.id;
    res.send(`Update service with ID: ${serviceId}`);
});

// Delete a service by ID
router.delete("/:id", (req, res) => {
    const serviceId = req.params.id;
    res.send(`Delete service with ID: ${serviceId}`);
});

module.exports = router;
