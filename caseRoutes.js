const express = require('express');
const router = express.Router();
const Case = require('../models/Case'); // Corrected path to model

// Route to add a new case
router.post('/add-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case added successfully', case: newCase });
  } catch (error) {
    res.status(400).json({ message: 'Error adding case', error: error.message });
  }
});

// Route to get all cases
router.get('/cases', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching cases', error: error.message });
  }
});

// Route to get a specific case by ID
router.get('/case/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(caseData);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching case', error: error.message });
  }
});

// ⭐ Route to delete a case by ID
router.delete('/case/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting case', error: error.message });
  }
});

module.exports = router;
