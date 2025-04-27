const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
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
  date: { type: Date, default: Date.now },
  followUpDate: { type: Date },
});

// Create Model
const Case = mongoose.model('Case', caseSchema);

// Middleware
app.use(bodyParser.json());

// Routes

// 1. Submit Case
app.post('/submit-case', async (req, res) => {
  try {
    const caseData = req.body;
    const newCase = new Case(caseData);
    await newCase.save();
    res.status(200).send('Case submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting case');
  }
});

// 2. Get Today's Due Follow-ups
app.get('/due-followups', async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const duePatients = await Case.find({
      followUpDate: { $gte: today, $lt: tomorrow }
    });

    res.status(200).json(duePatients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching due follow-ups');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
