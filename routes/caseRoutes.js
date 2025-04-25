const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

router.post('/', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting case' });
  }
});

module.exports = router;
