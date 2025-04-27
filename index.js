// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection (Use the connection string from the .env file)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the schema for the cases
const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfVisit: { type: Date, required: true },
  chiefComplaints: { type: String, required: true },
  historyOfPresentIllness: { type: String },
  pastHistory: { type: String },
  familyHistory: { type: String },
  appetite: { type: String },
  cravingsAversions: { type: String },
  thirst: { type: String },
  bowelMovement: { type: String },
  urine: { type: String },
  sleep: { type: String },
  dreams: { type: String },
  sweat: { type: String },
  thermalNature: { type: String },
  habits: { type: String },
  menstrualHistory: { type: String },
  mentalSymptoms: { type: String },
  followUpDate: { type: Date }, // This is for follow-up date
});

// Create a model for the schema
const Case = mongoose.model('Case', caseSchema);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route: Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to add a new case
app.post('/submit-case', express.json(), (req, res) => {
  const caseData = req.body;

  const newCase = new Case({
    ...caseData, // Spread the case data from the request body
    followUpDate: caseData.followUpDate ? new Date(caseData.followUpDate) : null,
  });

  newCase.save()
    .then(() => {
      res.status(200).json({ message: 'Case added successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error saving the case' });
    });
});

// Route to fetch follow-up cases (those with a follow-up date)
app.get('/follow-up-cases', (req, res) => {
  Case.find({ followUpDate: { $ne: null } }) // Query cases with follow-up dates
    .then(cases => {
      if (cases.length === 0) {
        return res.status(404).json({ message: 'No follow-up cases found' });
      }
      res.status(200).json(cases);
    })
    .catch(err => {
      console.error('Error fetching follow-up cases:', err);
      res.status(500).json({ error: 'Error loading follow-up cases. Please try again.' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
