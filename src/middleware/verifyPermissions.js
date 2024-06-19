// middleware/verifyPermission.js
// Middleware to verify if the user has the required role to access a route
const verifyPermissions = (requiredRole) => {
    // Return a middleware function
    return (req, res, next) => {
        const { role } = req.user; // Extract the user's role from the request object

        // Check if the user's role matches the required role
        if (!role || role !== requiredRole) {
            // If the user does not have the required role, send a 403 response with an error message
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // If the user has the required role, proceed to the next middleware or route handler
        next();
    };
};

// Export the middleware function for use in routes
module.exports = verifyPermissions;
