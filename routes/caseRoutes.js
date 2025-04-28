const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.post('/', caseController.createCase);
router.get('/', caseController.getCases);

module.exports = router;
