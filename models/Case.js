const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Case', caseSchema);
