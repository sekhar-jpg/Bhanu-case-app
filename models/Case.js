const mongoose = require('mongoose');

// Define the schema for cases
const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  followUpDate: { type: Date, required: true },
});

// Create the model based on the schema
const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
