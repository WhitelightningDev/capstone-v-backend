const mongoose = require('mongoose');

// Define the schema for Organizational Unit (OU)
const OUSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the organizational unit (required field)
});

// Define the OU model using the schema
const OU = mongoose.model('OU', OUSchema);

// Export the OU model
module.exports = OU;
