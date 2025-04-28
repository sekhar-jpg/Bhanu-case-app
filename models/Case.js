const mongoose = require('mongoose');

// Define the schema for the case model
const caseSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  symptoms: {
    type: [String], // Array of symptoms
    required: true
  },
  diagnosis: {
    type: String
  },
  remedy: {
    type: String
  },
  followUpDate: {
    type: Date
  },
  contactNumber: {
    type: String
  },
  caseCreatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model using the schema
const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
