// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path based on your project structure
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header format is invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details from database based on user ID from decoded token
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user object to req.user
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role // Adjust based on what is stored in your User model
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token is not valid' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = authMiddleware;
