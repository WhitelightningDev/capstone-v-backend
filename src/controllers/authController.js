// controllers/authController.js

// Import required modules
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for token generation
const User = require('../models/User');  // Import User model for database operations
require('dotenv').config();  // Load environment variables from .env file

// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });  // Sign a JWT token with user ID and secret, expires in 30 days
};

// Controller function to register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;  // Destructure name, email, and password from request body
    console.log(`Registering user with email: ${email}`);  // Log registration attempt
    try {
        const userExists = await User.findOne({ email });  // Check if user already exists in the database
        if (userExists) {
            console.log(`User with email ${email} already exists`);  // Log existing user
            return res.status(400).json({ message: 'User already exists' });  // Return error response if user exists
        }
        const user = await User.create({ name, email, password });  // Create a new user in the database
        console.log(`User created with ID: ${user._id}`);  // Log new user creation
        res.status(201).json({  // Send successful response with user details and token
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),  // Generate JWT token for the new user
        });
    } catch (error) {
        console.error('Error during registration:', error);  // Log any errors during registration
        res.status(500).json({ message: error.message });  // Send error response
    }
};

// Controller function to login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Destructure email and password from request body
    try {
        const user = await User.findOne({ email });  // Find user by email in the database
        if (user && (await user.matchPassword(password))) {  // Check if user exists and password matches
            res.json({  // Send successful response with user details and token
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),  // Generate JWT token for the logged-in user
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });  // Send error response for invalid credentials
        }
    } catch (error) {
        console.error('Error during login:', error);  // Log any errors during login
        res.status(500).json({ message: error.message });  // Send error response
    }
};

// Controller function for demo login
const demoLogin = async (req, res) => {
    const demoUser = {
        _id: 'demoUserId',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'Newsmanagement',
    };
    const token = generateToken(demoUser._id);
    res.json({
        ...demoUser,
        token,
    });
};

// Export the controller functions for use in routes
module.exports = { registerUser, loginUser, demoLogin };
