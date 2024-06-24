const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes'); // Updated path for routes
const credentialRepositoryRoutes = require('./src/routes/credentialRepositoryRoutes'); // Updated path for routes
const userRoutes = require('./src/routes/userRoutes'); // Updated path for routes


dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error', error.message);
});

// Mounting routes
app.use('/api/auth', authRoutes); // Mount authentication routes
app.use('/api/credential-repositories', credentialRepositoryRoutes); // Mount credential repository routes
app.use('/api/users', userRoutes); // Mount user routes


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
