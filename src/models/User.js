// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for User
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the user (required field)
    email: { type: String, required: true, unique: true }, // Email of the user (required and unique)
    password: { type: String, required: true }, // Password of the user (required field)
    role: { 
        type: String,
        enum: ['Newsmanagment', 'Software reviews', 'Hardware reviews', 'Opinion Publishing'],
        default: 'Newsmanagment' // Default role if not specified
    },
    ou: { type: mongoose.Schema.Types.ObjectId, ref: 'OU' }, // Reference to organizational unit (optional field)
});

// Middleware to hash password before saving user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
    next();
});

// Method to compare entered password with stored hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

// Define the User model using the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
