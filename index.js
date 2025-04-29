const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const caseRoutes = require('./routes/caseRoutes');
const Case = require('./models/Case'); // ✅ Ensure this matches the filename exactly (Case.js)

const app = express();

// ========================
// Middleware
// ========================
app.use(express.json());                      // Parse JSON bodies
app.use(express.static('public'));           // Serve static files from 'public' folder

// ========================
// MongoDB Connection
// ========================
const dbURI = 'mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ========================
// Basic Route
// ========================
app.get('/', (req, res) => {
  res.send('✅ Server deployed successfully on Render!');
});

// ========================
// Routes for Case Management
// ========================
app.use('/api/cases', caseRoutes);

// ========================
// Custom Routes
// ========================

// Search follow-ups by name or phone
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
    res.status(500).json({ error: 'Failed to fetch follow-ups', details: err.message });
  }
});

// Today's follow-ups based on followUpDate field
app.get('/today-followups', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const cases = await Case.find({
      followUpDate: { $gte: today, $lt: tomorrow }
    });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's follow-ups", details: err.message });
  }
});

// Get single case by ID
app.get('/cases/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    if (!caseData) return res.status(404).json({ error: 'Case not found' });
    res.json(caseData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case', details: err.message });
  }
});

// Update case by ID
app.put('/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCase) return res.status(404).json({ error: 'Case not found' });
    res.json({ message: 'Case updated successfully', case: updatedCase });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update case', details: err.message });
  }
});

// Delete case by ID
app.delete('/cases/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ error: 'Case not found' });
    res.json({ message: 'Case deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case', details: err.message });
  }
});

// Serve static followups HTML page
app.get('/followups-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'followups.html'));
});

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
