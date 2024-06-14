// Import required module
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for verifying JWT tokens

// Middleware function to authenticate users
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;  // Get the Authorization header from the request

    if (authHeader) {  // Check if the Authorization header is present
        const token = authHeader.split(' ')[1];  // Extract the token from the header (format: 'Bearer <token>')
        
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Verify the token using the secret key
            if (err) {  // If there's an error during verification
                return res.status(403).json({ message: 'Token is not valid' });  // Send a 403 response with an error message
            }
            req.user = user;  // If verification is successful, attach the decoded user information to the request object
            next();  // Proceed to the next middleware or route handler
        });
    } else {  // If the Authorization header is not present
        res.status(401).json({ message: 'Authorization header not found' });  // Send a 401 response with an error message
    }
};

// Export the middleware function for use in routes
module.exports = authMiddleware;
