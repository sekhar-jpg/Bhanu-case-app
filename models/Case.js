const mongoose = require('mongoose');

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
  followUpDate: { type: Date }, // Optional field for follow-up date
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
