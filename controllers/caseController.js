const Case = require('../models/caseModel'); // Ensure correct path

// Controller to create a new case
exports.createCase = async (req, res) => {
  try {
    // Validate that required fields are present in the request body
    if (
      !req.body.name ||
      !req.body.age ||
      !req.body.gender ||
      !req.body.maritalStatus ||
      !req.body.occupation ||
      !req.body.address ||
      !req.body.phone ||
      !req.body.dateOfVisit ||
      !req.body.chiefComplaints
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new case from the request body
    const newCase = new Case(req.body);

    // Save the case in the database
    await newCase.save();

    // Return the newly created case
    res.status(201).json(newCase);
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Return a general error message
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all cases
exports.getCases = async (req, res) => {
  try {
    // Retrieve all cases from the database
    const cases = await Case.find();

    // Return the list of cases
    res.status(200).json(cases);
  } catch (error) {
    // Return a general error message
    res.status(500).json({ message: error.message });
  }
};

// ⭐ Controller to get today's follow-up cases
exports.getTodayFollowUps = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    const followUps = await Case.find({
      followUpDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.status(200).json(followUps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
