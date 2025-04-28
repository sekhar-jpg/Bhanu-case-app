const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    maritalStatus: String,
    occupation: String,
    address: String,
    phone: String,
    dateOfVisit: Date,
    complaints: [{ complaint: String, duration: String, description: String }],
    historyOfPresentIllness: String,
    pastHistory: {
        childhoodDiseases: String,
        surgeriesInjuries: String,
        majorIllnesses: String,
    },
    familyHistory: String,
    personalHistory: {
        appetite: String,
        cravingsAversions: String,
        thirst: String,
        bowelMovement: String,
        urine: String,
        sleep: String,
        dreams: String,
        sweat: String,
        thermal: String,
        habits: String,
        menstrualHistory: String,
    },
    mentalSymptoms: String,
    generalRemarks: String,
    doctorObservations: String,
    prescriptions: [{
        date: Date,
        remedyName: String,
        potency: String,
        dose: String,
        instructions: String,
    }]
});

module.exports = mongoose.model('Case', caseSchema);
