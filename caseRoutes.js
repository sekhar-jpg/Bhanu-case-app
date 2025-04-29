const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// Add a new case
router.post('/', async (req, res) => {
  const newCase = new Case(req.body);
  try {
    await newCase.save();
    res.status(201).json({ message: 'Case created successfully', case: newCase });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create case', details: error });
  }
});

// Get all cases
router.get('/', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cases', details: error });
  }
});

// Get a single case by ID
router.get('/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    if (caseData) {
      res.status(200).json(caseData);
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case', details: error });
  }
});

// Update a case by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCase) {
      res.status(200).json({ message: 'Case updated successfully', case: updatedCase });
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update case', details: error });
  }
});

// Delete a case by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (deletedCase) {
      res.status(200).json({ message: 'Case deleted successfully' });
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete case', details: error });
  }
});

module.exports = router;
