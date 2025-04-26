const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (ensure your MongoDB URI is correct)
mongoose.connect('your_mongodb_uri_here', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Case schema and model
const caseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  complaints: String,
  remedy: String,
  caseDate: Date
});
const Case = mongoose.model('Case', caseSchema);

// Define the /submit-case POST route
app.post('/submit-case', (req, res) => {
  const newCase = new Case({
    name: req.body.name,
    age: req.body.age,
    complaints: req.body.complaints,
    remedy: req.body.remedy,
    caseDate: req.body.caseDate
  });

  newCase.save()
    .then(() => res.status(201).send('Case submitted successfully'))
    .catch(err => res.status(400).send('Error submitting case: ' + err));
});

// Start the server
app.listen(10000, () => {
  console.log('Server is running on port 10000');
});
