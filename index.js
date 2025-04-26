const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Case schema and model
const caseSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: String, required: true },
  date: { type: Date, required: true },
});

const Case = mongoose.model('Case', caseSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Case Submission App');
});

// Submit case route
app.post('/submit-case', (req, res) => {
  const { patientName, symptoms, date } = req.body;

  const newCase = new Case({
    patientName,
    symptoms,
    date,
  });

  newCase
    .save()
    .then((savedCase) => {
      res.status(200).send('Case submitted successfully');
    })
    .catch((err) => {
      console.error('Error saving case:', err);
      res.status(500).send('Error saving case');
    });
});

// Start the server
app.listen(10000, () => {
  console.log('Server is running on port 10000');
});
