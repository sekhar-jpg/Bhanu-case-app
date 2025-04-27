const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // This will load the environment variables from .env file

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

// Case Schema Definition (Ensure the followUpDate is included)
const caseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  maritalStatus: String,
  occupation: String,
  address: String,
  phone: String,
  dateOfVisit: Date,
  chiefComplaints: String,
  historyOfPresentIllness: String,
  pastHistory: String,
  familyHistory: String,
  appetite: String,
  cravingsAversions: String,
  thirst: String,
  bowelMovement: String,
  urine: String,
  sleep: String,
  dreams: String,
  sweat: String,
  thermalNature: String,
  habits: String,
  menstrualHistory: String,
  mentalSymptoms: String,
  followUpDate: Date, // Added follow-up date
});

const Case = mongoose.model('Case', caseSchema);

// Route to fetch follow-up cases (due for follow-up)
app.get('/follow-ups', async (req, res) => {
  try {
    const today = new Date();
    const followUpCases = await Case.find({
      followUpDate: { $gte: today } // Fetch cases where followUpDate is today or in the future
    });

    if (followUpCases.length > 0) {
      res.json(followUpCases);
    } else {
      res.status(404).json({ message: 'No follow-up cases found.' });
    }
  } catch (error) {
    console.error("Error fetching follow-up cases:", error);
    res.status(500).json({ message: 'Error loading follow-up cases. Please try again.' });
  }
});

// Serve index.html for the homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
