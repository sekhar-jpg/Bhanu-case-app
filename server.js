// server.js
const express = require('express');
const cors = require('cors');  // Importing the CORS library
const app = express();

// Use CORS to allow requests from the frontend (React)
app.use(cors());  // Enabling CORS middleware

// Middleware to parse JSON requests
app.use(express.json());

// Sample remedy database (expand with more remedies)
const remediesDatabase = {
  headache: ["Belladonna", "Nux Vomica", "Gelsemium"],
  nausea: ["Nux Vomica", "Ipecac", "Arsenicum album"],
  // Add more remedies and symptoms here as needed
};

// Function to match symptoms to remedies
const getRemediesFromModel = (description) => {
  const symptoms = description.toLowerCase();

  let remedies = [];

  // Checking for specific symptoms and matching with remedies
  if (symptoms.includes("headache")) {
    remedies = remedies.concat(remediesDatabase.headache);
  }
  if (symptoms.includes("nausea")) {
    remedies = remedies.concat(remediesDatabase.nausea);
  }

  // You can add more complex conditions or logic related to miasms here

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
