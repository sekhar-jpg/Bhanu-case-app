const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (ensure your MongoDB URI is correct)
const mongoURI = 'mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the Case model
const Case = mongoose.model('Case', new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  complaint: String
}));

// Endpoint to submit a case
app.post('/submit-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(200).send('Case submitted successfully');
  } catch (err) {
    res.status(400).send(`Error submitting case: ${err}`);
  }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
