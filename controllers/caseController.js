const Case = require('../models/caseModel');

// Create new case
exports.createCase = async (req, res) => {
    try {
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(201).json(newCase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all cases
exports.getCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
