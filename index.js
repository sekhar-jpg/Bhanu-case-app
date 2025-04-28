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
// Delete a case by ID
app.delete('/cases/:id', async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case' });
  }
});
// Get single case by ID
app.get('/cases/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    res.json(caseData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case' });
  }
});
// Update case by ID
app.put('/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Case updated successfully', case: updatedCase });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update case' });
  }
});
// Get today's follow-up cases
app.get('/today-followups', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    const cases = await Case.find({
      followUpDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch today\'s follow-ups' });
  }
});
