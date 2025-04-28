const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const caseRoutes = require('./routes/caseRoutes'); // Import the case routes

const app = express();

// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cors()); // To allow cross-origin requests

// Routes
app.use('/api/cases', caseRoutes); // Use caseRoutes for '/api/cases'

// Test route
app.get('/', (req, res) => {
  res.send('Server deployed successfully on Render!');
});

// Database connection (use your MongoDB URI)
mongoose
  .connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Dynamic port selection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
