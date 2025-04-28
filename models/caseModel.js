const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfVisit: { type: Date, required: true },
    chiefComplaints: { type: String, required: true },
    historyOfPresentIllness: { type: String, required: true },
    pastHistory: { type: String, required: true },
    familyHistory: { type: String, required: true },
    appetite: { type: String, required: true },
    cravingsAversions: { type: String, required: true },
    thirst: { type: String, required: true },
    bowelMovement: { type: String, required: true },
    urine: { type: String, required: true },
    sleep: { type: String, required: true },
    dreams: { type: String, required: true },
    sweat: { type: String, required: true },
    thermalNature: { type: String, required: true },
    habits: { type: String, required: true },
    menstrualHistory: { type: String, required: true },
    mentalSymptoms: { type: String, required: true },
    generalRemarks: { type: String, required: true },
    doctorObservations: { type: String, required: true },
    prescription: { type: String, required: true },
    followUpDate: { type: Date, required: true }, // Added followUpDate
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
