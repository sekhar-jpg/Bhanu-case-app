const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true,
        min: [0, 'Age must be a positive number']  // Ensure age is a positive number
    },
    gender: { 
        type: String, 
        required: true,
        enum: ['Male', 'Female', 'Other']  // Only allow certain values for gender
    },
    maritalStatus: { 
        type: String, 
        required: true,
        enum: ['Single', 'Married', 'Divorced', 'Widowed']  // Add marital status options
    },
    occupation: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']  // Regex to match a 10-digit phone number
    },
    dateOfVisit: { 
        type: Date, 
        required: true 
    },
    chiefComplaints: { 
        type: String, 
        required: true 
    },
    historyOfPresentIllness: { 
        type: String, 
        required: true 
    },
    pastHistory: { 
        type: String, 
        required: true 
    },
    familyHistory: { 
        type: String, 
        required: true 
    },
    appetite: { 
        type: String, 
        required: true 
    },
    cravingsAversions: { 
        type: String, 
        required: true 
    },
    thirst: { 
        type: String, 
        required: true 
    },
    bowelMovement: { 
        type: String, 
        required: true 
    },
    urine: { 
        type: String, 
        required: true 
    },
    sleep: { 
        type: String, 
        required: true 
    },
    dreams: { 
        type: String, 
        required: true 
    },
    sweat: { 
        type: String, 
        required: true 
    },
    thermalNature: { 
        type: String, 
        required: true 
    },
    habits: { 
        type: String, 
        required: true 
    },
    menstrualHistory: { 
        type: String, 
        required: true 
    },
    mentalSymptoms: { 
        type: String, 
        required: true 
    },
    generalRemarks: { 
        type: String, 
        required: true 
    },
    doctorObservations: { 
        type: String, 
        required: true 
    },
    prescription: { 
        type: String, 
        required: true 
    },
    followUpDate: { 
        type: Date, 
        required: true 
    }, 
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
