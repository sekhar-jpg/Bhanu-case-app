// Route to fetch follow-up cases
app.get('/api/follow-ups', async (req, res) => {
  try {
    // Query to find cases with follow-up dates in the future
    const followUpCases = await Case.find({ followUpDate: { $gte: new Date() } });

    if (followUpCases.length === 0) {
      return res.status(404).json({ message: 'No follow-up cases found.' });
    }

    // Send follow-up cases as response
    res.json(followUpCases);
  } catch (err) {
    console.error('Error fetching follow-up cases:', err);
    res.status(500).json({ message: 'Error loading follow-up cases. Please try again.' });
  }
});
