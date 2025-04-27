const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  maritalStatus: String,
  occupation: String,
  address: String,
  phone: String,
  dateOfVisit: Date,
  chiefComplaints: [
    {
      complaint: String,
      duration: String,
      description: String
    }
  ],
  historyOfPresentIllness: String,
  pastHistory: {
    childhoodDiseases: String,
    surgeries: String,
    majorIllnesses: String
  },
  familyHistory: String,
  personalHistory: {
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
    menstrualHistory: String
  },
  mentalSymptoms: String,
  generalRemarks: String,
  doctorObservations: String,
  prescription: [
    {
      date: Date,
      remedyName: String,
      potency: String,
      dose: String,
      instructions: String
    }
  ],
  followUpDate: Date,
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;
