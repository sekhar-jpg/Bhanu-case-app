const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const caseRoutes = require('./routes/caseRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Routes
app.use('/api/cases', caseRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('MongoDB connection failed', err.message);
});
