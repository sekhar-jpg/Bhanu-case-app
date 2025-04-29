// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Import custom routes
const caseRoutes = require('./routes/caseRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Remedy logic
const remediesDatabase = {
  headache: ["Belladonna", "Nux Vomica", "Gelsemium"],
  nausea: ["Nux Vomica", "Ipecac", "Arsenicum album"],
  // Add more remedies and symptoms here as needed
};

const getRemediesFromModel = (description) => {
  const symptoms = description.toLowerCase();
  let remedies = [];

  if (symptoms.includes("headache")) {
    remedies = remedies.concat(remediesDatabase.headache);
  }
  if (symptoms.includes("nausea")) {
    remedies = remedies.concat(remediesDatabase.nausea);
  }

  return remedies.length ? remedies : ["No matching remedies found"];
};

// Remedy API endpoint
app.post('/api/get-remedy', (req, res) => {
  const { description } = req.body;
  const remedies = getRemediesFromModel(description);
  res.json({ remedies });
});

// Use case routes
app.use('/submit-case', caseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
