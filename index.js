const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Case = require('./models/Case');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error: ", err));

// Home route
app.get('/', (req, res) => {
  res.send('Bhanu Reminder App is running!');
});

// Case submission route (POST)
app.post('/submit-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(200).json({ message: 'Case submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error submitting case' });
  }
});

// Get all cases route (GET)
app.get('/cases', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching cases' });
  }
});

// Today's Follow-up Patients Route (GET)
app.get('/due-today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    const dueCases = await Case.find({
      followUpDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.status(200).json(dueCases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching due cases' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
