const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log('MongoDB connection error:', err));

// MongoDB Schema for the Case Sheet
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
  generalRemarks: String,
  doctorObservations: String,
  prescription: String,
  followUpDate: Date,
});

// Model for Case Sheet
const Case = mongoose.model('Case', caseSchema);

// Route for submitting a new case
app.post('/submit-case', async (req, res) => {
  try {
    const {
      name, age, gender, maritalStatus, occupation, address, phone, dateOfVisit,
      chiefComplaints, historyOfPresentIllness, pastHistory, familyHistory, appetite,
      cravingsAversions, thirst, bowelMovement, urine, sleep, dreams, sweat, thermalNature,
      habits, menstrualHistory, mentalSymptoms, generalRemarks, doctorObservations, prescription
    } = req.body;

    // Calculate follow-up date (15 days after date of visit)
    const followUpDate = new Date(dateOfVisit);
    followUpDate.setDate(followUpDate.getDate() + 15); // Add 15 days to date of visit

    // Create a new case
    const newCase = new Case({
      name, age, gender, maritalStatus, occupation, address, phone, dateOfVisit,
      chiefComplaints, historyOfPresentIllness, pastHistory, familyHistory, appetite,
      cravingsAversions, thirst, bowelMovement, urine, sleep, dreams, sweat, thermalNature,
      habits, menstrualHistory, mentalSymptoms, generalRemarks, doctorObservations, prescription,
      followUpDate
    });

    // Save the new case to the database
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully', case: newCase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting the case. Please try again.' });
  }
});

// Route for fetching all follow-up cases
app.get('/follow-ups', async (req, res) => {
  try {
    const today = new Date();
    const followUps = await Case.find({
      followUpDate: { $gte: today } // cases where follow-up date is today or later
    });

    if (followUps.length > 0) {
      res.status(200).json(followUps);
    } else {
      res.status(200).json({ message: 'No follow-up cases found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error loading follow-up cases. Please try again.' });
  }
});

// Route for updating follow-up date (15 days after dateOfVisit)
app.put('/update-follow-up/:id', async (req, res) => {
  try {
    const caseId = req.params.id;
    const caseData = req.body;

    const followUpDate = new Date(caseData.dateOfVisit);
    followUpDate.setDate(followUpDate.getDate() + 15); // Setting follow-up date to 15 days after visit

    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { followUpDate: followUpDate },
      { new: true } // return the updated case
    );

    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.status(200).json({ message: 'Follow-up date updated successfully', case: updatedCase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating the follow-up date. Please try again.' });
  }
});

// Home Route to Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
