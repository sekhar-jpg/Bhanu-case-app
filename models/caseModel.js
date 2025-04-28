const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  caseDetails: {
    type: String,
    required: true
  },
  followUpDate: {
    type: Date
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
