const Case = require('../models/caseModel');

exports.submitCase = async (req, res) => {
    try {
        const newCase = new Case({
            patientName: req.body.name,
            phoneNumber: req.body.phone,
            caseDetails: req.body.caseDetails,
            followUpDate: req.body.followUpDate
        });

        await newCase.save();
        res.status(200).json({ message: 'Case submitted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error submitting case' });
    }
};
