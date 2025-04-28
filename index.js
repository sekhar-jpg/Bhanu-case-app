require('dotenv').config(); // To load .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes'); // updated name

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', caseRoutes); // Use caseRoutes instead of submitCaseRoutes

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
