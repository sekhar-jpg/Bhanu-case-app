require('dotenv').config(); // To load .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes'); // Corrected path for caseRoutes

const app = express();

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
const PORT = process.env.PORT; // IMPORTANT change here!!

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
