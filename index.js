const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const caseRoutes = require('./routes/caseRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/submit-case', caseRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
