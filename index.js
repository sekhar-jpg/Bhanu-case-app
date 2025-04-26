const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Case = require('./models/Case'); // 👉 correct path

const app = express();
app.use(bodyParser.json());

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING_HERE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.post('/submit-case', async (req, res) => {
  try {
    const newCase = new Case({
      name: req.body.name || '',
      age: req.body.age || 0,
      gender: req.body.gender || '',
      phone: req.body.phone || '',
      maritalStatus: req.body.maritalStatus || '',
      occupation: req.body.occupation || '',
      address: req.body.address || '',
      dateOfVisit: req.body.dateOfVisit || new Date(),
      chiefComplaints: req.body.chiefComplaints || [],
      historyPresentIllness: req.body.historyPresentIllness || '',
      pastHistory: req.body.pastHistory || '',
      familyHistory: req.body.familyHistory || '',
      appetite: req.body.appetite || '',
      cravingsAversions: req.body.cravingsAversions || '',
      thirst: req.body.thirst || '',
      bowelMovement: req.body.bowelMovement || '',
      urine: req.body.urine || '',
      sleep: req.body.sleep || '',
      dreams: req.body.dreams || '',
      sweat: req.body.sweat || '',
      thermal: req.body.thermal || '',
      habits: req.body.habits || '',
      menstrualHistory: req.body.menstrualHistory || '',
      mentalSymptoms: req.body.mentalSymptoms || '',
      generalRemarks: req.body.generalRemarks || '',
      doctorObservations: req.body.doctorObservations || '',
      prescription: req.body.prescription || '',
      date: new Date(), // 👉 today
      followUpDate: req.body.followUpDate ? new Date(req.body.followUpDate) : new Date(), // 👉 today if not given
    });

    await newCase.save();
    res.status(200).json({ message: "Case submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error submitting case" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
