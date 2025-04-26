const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  maritalStatus: { type: String },
  occupation: { type: String },
  address: { type: String },
  dateOfVisit: { type: Date },
  chiefComplaints: { type: Array },
  historyPresentIllness: { type: String },
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
  thermal: { type: String },
  habits: { type: String },
  menstrualHistory: { type: String },
  mentalSymptoms: { type: String },
  generalRemarks: { type: String },
  doctorObservations: { type: String },
  prescription: { type: String },
  date: { type: Date, default: Date.now }, // 👉 default current date
  followUpDate: { type: Date },             // 👉 optional
});

module.exports = mongoose.model('Case', caseSchema);
