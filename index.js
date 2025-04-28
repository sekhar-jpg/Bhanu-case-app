require('dotenv').config(); // To load .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes'); // Corrected path for caseRoutes

const app = express();
const port = process.env.PORT || 5000; // Dynamically use the Render-provided port

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', caseRoutes); // Prefix all case routes with /api

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
