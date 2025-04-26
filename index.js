const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the Case schema
const caseSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date,
    followUpDate: Date
});

const Case = mongoose.model('Case', caseSchema);

// Connect to MongoDB (Replace with your actual MongoDB URI)
mongoose.connect('mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Handle form submission (POST request to /submit-case)
app.post('/submit-case', async (req, res) => {
    const { name, phone, date, followUpDate } = req.body;

    // Check if all required fields are present
    if (!name || !phone || !date || !followUpDate) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new Case document
    const newCase = new Case({
        name,
        phone,
        date: new Date(date),
        followUpDate: new Date(followUpDate)
    });

    try {
        // Save the new case to the database
        await newCase.save();
        res.json({ success: true, message: 'Case submitted successfully' });
    } catch (err) {
        console.log('Error saving case:', err);
        res.status(500).json({ success: false, message: 'Error saving case' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
