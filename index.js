require('dotenv').config(); // To load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes'); // Importing your caseRoutes

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json()); // Use this middleware to handle JSON payload

// Routes
app.use('/api', caseRoutes); // Prefix all case routes with /api

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server deployed successfully on Render!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
