// routes/credentialRepositoryRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const CredentialRepository = require('../models/CredentialRepository'); // Import CredentialRepository model

// Middleware to verify user permissions
const verifyPermissions = (req, res, next) => {
    if (req.user.role !== 'admin') { // Check if user role is not admin
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

// POST endpoint to add a credential to a specific repository
router.post('/:repositoryId', authMiddleware, verifyPermissions, async (req, res) => {
    const { repositoryId } = req.params;
    const { name, username } = req.body;
    try {
        const repository = await CredentialRepository.findById(repositoryId); // Find repository by ID
        if (!repository) {
            return res.status(404).json({ message: 'Repository not found' });
        }
        repository.credentials.set(name, username); // Set credential with name and username
        const updatedRepository = await repository.save(); // Save updated repository
        res.status(201).json(updatedRepository); // Respond with updated repository
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server error
    }
});

module.exports = router; // Export router for use in other parts of the application
