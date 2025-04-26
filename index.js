const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Case = require('./Case'); // or './models/Case' based on your file structure

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// ✅ Sample POST route
app.post('/submit-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
