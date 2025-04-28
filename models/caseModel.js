const mongoose = require('mongoose');

// Case Schema
const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Patient's name
  age: { type: Number, required: true },   // Patient's age
  gender: { type: String, required: true }, // Patient's gender
  maritalStatus: { type: String, required: true }, // Marital status
  occupation: { type: String, required: true }, // Occupation
  address: { type: String, required: true }, // Address
  phone: { type: String, required: true }, // Phone number
  dateOfVisit: { type: Date, required: true }, // Date of visit
  chiefComplaints: { type: String, required: true }, // Main issues patient is facing
  followUpDate: { type: Date },  // Optional field for follow-up date
  medicalHistory: { type: String },  // History of medical conditions
  treatmentHistory: { type: String },  // History of previous treatments
  allergies: { type: String },  // Allergies (if any)
  familyHistory: { type: String },  // Family medical history
  doctorName: { type: String },  // Doctor's name or ID
  diagnosis: { type: String },  // Diagnosis details
  medications: { type: String },  // Medications prescribed
  additionalNotes: { type: String },  // Additional notes or observations
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
