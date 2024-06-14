const mongoose = require('mongoose');

// Define the schema for Division
const DivisionSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the division (required field)
    ou: { type: mongoose.Schema.Types.ObjectId, ref: 'OU' },  // Reference to OU model (optional field)
});

// Define the Division model using the schema
const Division = mongoose.model('Division', DivisionSchema);

// Export the Division model
module.exports = Division;
