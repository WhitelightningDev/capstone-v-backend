const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const verifyPermissions = require('../middleware/verifyPermissions');
const router = express.Router();

// Endpoint to fetch all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.json(users); // Respond with JSON array of users
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to assign a user to a division (requires admin permissions)
router.post('/assign-division/:divisionId/:userId', [authMiddleware, verifyPermissions('admin')], async (req, res) => {
    const { divisionId, userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming your User model has a 'division' field that stores division ID
        user.division = divisionId; // Assign user to division
        await user.save(); // Save updated user with assigned division

        res.json(user); // Respond with updated user object
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
