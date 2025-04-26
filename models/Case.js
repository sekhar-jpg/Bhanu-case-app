const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String },
  occupation: { type: String },
  address: { type: String },
  phone: { type: String, required: true },
  dateOfVisit: { type: Date },

  chiefComplaints: { type: String }, // (Problem + Duration + Details)
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
  generalRemarks: { type: String },
  doctorObservations: { type: String },

  prescription: { type: String },
  followUpDate: { type: Date, required: true },
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
