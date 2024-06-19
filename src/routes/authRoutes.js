const express = require('express');
const { registerUser, loginUser, demoLogin, updateProfile } = require('../controllers/authController'); // Import updateProfile function
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const router = express.Router();

// Define routes for user authentication
router.post('/register', registerUser); // POST request to register a new user
router.post('/login', loginUser);       // POST request to authenticate and log in a user
router.post('/demo-login', demoLogin);  // POST request for demo login

// Endpoint to retrieve user profile based on token
router.get('/profile', authMiddleware, (req, res) => {
    // Return the user details attached to req.user by authMiddleware
    res.json(req.user);
});

// Endpoint to update user profile based on token
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
