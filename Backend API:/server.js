// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS to allow requests from the frontend (React)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Sample remedy database (expand with more remedies)
const remediesDatabase = {
  headache: ["Belladonna", "Nux Vomica", "Gelsemium"],
  nausea: ["Nux Vomica", "Ipecac", "Arsenicum album"],
  // Add more remedies and symptoms here
};

// Function to match symptoms to remedies
const getRemediesFromModel = (description) => {
  const symptoms = description.toLowerCase();

  let remedies = [];

  if (symptoms.includes("headache")) {
    remedies = remedies.concat(remediesDatabase.headache);
  }
  if (symptoms.includes("nausea")) {
    remedies = remedies.concat(remediesDatabase.nausea);
  }

  // Add more complex conditions and miasms analysis here
  
  return remedies.length ? remedies : ["No matching remedies found"];
};

// API endpoint for getting remedies based on the case description
app.post('/api/get-remedy', (req, res) => {
  const { description } = req.body;

  // Get remedy suggestions based on the case description
  const remedies = getRemediesFromModel(description);
  
  // Return the remedies to the frontend
  res.json({ remedies });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
