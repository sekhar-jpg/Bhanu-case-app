const Case = require('../models/Case');  // Ensure correct path

// Controller to create a new case
exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
