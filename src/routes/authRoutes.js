const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Import controller functions
const router = express.Router();

// Define routes for user authentication
router.post('/register', registerUser); // POST request to register a new user
router.post('/login', loginUser);       // POST request to authenticate and log in a user

module.exports = router;
