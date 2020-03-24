const express = require("express");
const router = express.Router();
const Users = require("../models/users");

// Okta api call
router.get('/okta', (req, res) => {
    res.send('Okta data')
})

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
})

// Get one user

// Create one user

// Update one user

// Delete once user

module.exports = router;
