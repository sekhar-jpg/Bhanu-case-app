const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Case = require('./models/Case');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // <<== ADD THIS LINE!

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error: ", err));

// POST route to submit case
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

// GET route to fetch cases
app.get('/cases', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching cases' });
  }
});

// Home
app.get('/', (req, res) => {
  res.send('Bhanu Reminder App is running!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
