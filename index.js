const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection using the connection string from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully!");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
