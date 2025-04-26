const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  problem: { type: String, required: true },
  date: { type: Date, required: false } // ✅ now not required
});

module.exports = mongoose.model('Case', caseSchema);
