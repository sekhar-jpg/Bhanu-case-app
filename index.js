// index.js

const express = require('express');
const mongoose = require('mongoose');
const Case = require('./models/Case');  // Make sure this path is correct

const app = express();
const port = 10000;

// MongoDB connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Test route to check if Case model is working
app.get('/test-case', async (req, res) => {
  try {
    const caseData = await Case.find();  // Fetch all cases from the database
    if (!caseData.length) {
      return res.status(404).json({ message: 'No cases found' });
    }
    res.json(caseData);  // Send the cases as JSON
  } catch (error) {
    console.error('Error fetching cases:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error occurred' });  // Send error response
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
