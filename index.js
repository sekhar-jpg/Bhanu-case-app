const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://bhanuhomeopath:sekhar123@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Case schema
const caseSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: { type: Date, default: Date.now },
    symptoms: String
});

const Case = mongoose.model('Case', caseSchema);

// Routes
app.get('/', (req, res) => {
    res.send('🎉 Bhanu Homeopathy Reminder App Running');
});

app.post('/submit-case', async (req, res) => {
    try {
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(200).json({ message: 'Case saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving case', error });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
