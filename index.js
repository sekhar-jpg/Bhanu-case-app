const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const caseRoutes = require('./routes/caseRoutes'); // Your routes file
const Case = require('./models/Case'); // ✅ Add this to access the Case model
const app = express();

// Middleware for parsing JSON data from request bodies
app.use(express.json());

// Serve static files (images, CSS, HTML) from the 'public' folder
app.use(express.static('public'));

// MongoDB connection URI
const dbURI = 'mongodb+srv://bhanuhomeopathy:sekhar123456@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Test route to verify server is working correctly
app.get('/', (req, res) => {
  res.send('Server deployed successfully on Render!');
});

// Routes for case management
app.use('/api/cases', caseRoutes);

// =========================
// Custom Routes
// =========================

// Fetch all follow-ups based on search query (name or phone)
app.get('/follow-ups', async (req, res) => {
  const searchQuery = req.query.search || '';  // Default to an empty string if no search query is provided

  try {
    const followUps = await Case.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search for name
        { phone: { $regex: searchQuery, $options: 'i' } }   // Case-insensitive search for phone
      ]
    });
    res.json(followUps);  // Send the results as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch follow-ups', details: err.message });
  }
});

// Get today's follow-ups
app.get('/today-followups', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set time to 00:00 to get the start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);  // Set time to start of the next day

    const cases = await Case.find({
      followUpDate: {
        $gte: today,  // Start from today
        $lt: tomorrow  // Until tomorrow
      }
    });

    res.json(cases);  // Send the cases for today as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch today\'s follow-ups', details: err.message });
  }
});

// Get a single case by ID
app.get('/cases/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);  // Find case by ID
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(caseData);  // Send case data as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case', details: err.message });
  }
});

// Update case by ID
app.put('/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Update case
    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case updated successfully', case: updatedCase });  // Send success message with updated case data
  } catch (err) {
    res.status(500).json({ error: 'Failed to update case', details: err.message });
  }
});

// Delete case by ID
app.delete('/cases/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);  // Delete case by ID
    if (!deletedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case deleted successfully' });  // Send success message for deletion
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case', details: err.message });
  }
});

// Serve Follow-ups HTML Page (example for serving static HTML file)
app.get('/followups-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'followups.html'));  // Serve the 'followups.html' page from 'public' directory
});

// =========================
// Start the Server
// =========================
const PORT = process.env.PORT || 5000;  // Use environment port or fallback to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
