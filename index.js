const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const caseRoutes = require('./routes/caseRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/cases', caseRoutes);

app.get('/', (req, res) => {
    res.send('API Running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
