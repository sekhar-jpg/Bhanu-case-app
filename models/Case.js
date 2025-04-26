// models/Case.js

const mongoose = require('mongoose');

// Define the schema for a "Case"
const caseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const Case = mongoose.model('Case', caseSchema);

// Export the model to use it in other files
module.exports = Case;
