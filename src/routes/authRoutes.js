// routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser, demoLogin } = require('../controllers/authController'); // Import controller functions
const router = express.Router();

// Define routes for user authentication
router.post('/register', registerUser); // POST request to register a new user
router.post('/login', loginUser);       // POST request to authenticate and log in a user
router.post('/demo-login', demoLogin);  // POST request for demo login

module.exports = router;
