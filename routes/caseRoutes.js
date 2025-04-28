const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// Handle case submission
router.post('/', caseController.createCase);

// Retrieve all cases (for follow-ups)
router.get('/', caseController.getCases);

module.exports = router;
