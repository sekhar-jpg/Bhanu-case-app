require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (with updated db name: Bhanuhomeopathy)
mongoose.connect('mongodb+srv://Bhanuhomeopathy:bhanu123@cluster0.wm2pxqs.mongodb.net/Bhanuhomeopathy?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ MongoDB connected successfully');
});

// Mongoose Schema & Model
const caseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  followUpDate: Date
});

const Case = mongoose.model('Case', caseSchema);

// Routes

// 1. Submit case
app.post('/submit-case', async (req, res) => {
  try {
    const { name, phone, date, followUpDate } = req.body;
    const newCase = new Case({ name, phone, date, followUpDate });
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (error) {
    console.error('Error saving case:', error);
    res.status(500).json({ message: 'Failed to submit case' });
  }
});

// 2. Get today's follow-ups
app.get('/follow-ups-today', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const results = await Case.find({
      followUpDate: {
        $gte: new Date(today + 'T00:00:00Z'),
        $lte: new Date(today + 'T23:59:59Z')
      }
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
    res.status(500).json({ message: 'Failed to fetch follow-ups' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
