// models/CredentialRepository.js

const mongoose = require('mongoose');

// Define the schema for CredentialRepository
const CredentialRepositorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the credential repository (required field)
    division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true }, // Reference to Division model (required field)
    credentials: { type: Map, of: String }, // Map to store key-value pairs of credentials (simple key-value structure)
});

// Define the CredentialRepository model using the schema
const CredentialRepository = mongoose.model('CredentialRepository', CredentialRepositorySchema);

// Export the CredentialRepository model
module.exports = CredentialRepository;
