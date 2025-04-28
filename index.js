const express = require('express');
const mongoose = require('mongoose');
const caseRoutes = require('./routes/caseRoutes'); // Your routes file
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
const dbURI = 'mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Test route to verify server
app.get('/', (req, res) => {
  res.send('Server deployed successfully on Render!');
});

// Routes for cases (Case management)
app.use('/api/cases', caseRoutes);

// Dynamic port selection for Render or localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get('/follow-ups', async (req, res) => {
  const searchQuery = req.query.search || '';

  try {
    const followUps = await Case.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { phone: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch follow-ups' });
  }
});
