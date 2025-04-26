const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Case model
const Case = mongoose.model('Case', new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  followUpDate: Date
}));

// Submit case endpoint
app.post('/submit-case', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const today = new Date();
    const followUpDate = new Date();
    followUpDate.setDate(today.getDate() + 15); // 15 days later

    const newCase = new Case({
      name,
      phone,
      date: today,
      followUpDate
    });

    await newCase.save();
    res.status(200).send('Case submitted successfully');
  } catch (err) {
    res.status(400).send(`Error submitting case: ${err}`);
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
