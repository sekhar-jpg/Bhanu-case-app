require('dotenv').config();  // <-- Add this at the top to use .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes');  // <-- Correct path, move caseRoutes.js into 'routes' folder if not done

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', caseRoutes);

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
