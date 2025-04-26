const express = require('express');
const mongoose = require('mongoose');
const Case = require('./models/Case'); // Correct import path for Case model

const app = express();
const port = process.env.PORT || 10000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to parse incoming requests
app.use(express.json());

// Example endpoint to create a case
app.post('/submit-case', (req, res) => {
  const { patientName, symptoms, date } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Date is required.' });
  }

  const newCase = new Case({
    patientName,
    symptoms,
    date,
  });

  newCase.save()
    .then((savedCase) => {
      res.status(201).json(savedCase);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error saving case.', details: err });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
