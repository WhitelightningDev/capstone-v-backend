const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Use 'bcryptjs' for hashing passwords
const User = require('../models/User'); // Adjust path as needed based on your project structure
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const verifyPermissions = require('../middleware/verifyPermissions'); // Import permissions verification middleware

const router = express.Router();

// Endpoint for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) { // Compare hashed password
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token }); // Respond with JWT token on successful login
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to change user role (requires admin permissions)
router.put('/change-role/:userId', [authMiddleware, verifyPermissions('admin')], async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true }); // Update user role
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Respond with updated user object
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
        user.division = divisionId; // Assign user to division
        await user.save(); // Save updated user
        res.json(user); // Respond with updated user object
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // Export router for use in other parts of the application
