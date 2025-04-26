const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Case = require('./models/Case');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error: ", err));

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

// Home route
app.get('/', (req, res) => {
  res.send('Bhanu Reminder App is running!');
});

// Add New Case Form Route
app.get('/add-case', (req, res) => {
  res.send(`
    <h1>Add New Case</h1>
    <form method="POST" action="/submit-case">
      <label>Name:</label><br/>
      <input type="text" name="name" required /><br/><br/>
      
      <label>Phone:</label><br/>
      <input type="text" name="phone" required /><br/><br/>
      
      <label>Follow-Up Date:</label><br/>
      <input type="date" name="followUpDate" required /><br/><br/>
      
      <button type="submit">Submit Case</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
