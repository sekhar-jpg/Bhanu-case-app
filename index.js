const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./caseRoutes');  // Import case routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON data

// Use the routes for handling cases
app.use('/api', caseRoutes);  // Prefix routes with /api

// MongoDB connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
