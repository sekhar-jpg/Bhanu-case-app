const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ************************************************************************************
// * Important!  This is where you define your API routes.
// * For example:
// ************************************************************************************
app.post('/api/get-remedy', (req, res) => {
  //  Your code to handle the 'get-remedy' request goes here.
  //  Example:
  //  console.log("Received request:", req.body);
  //  res.json({ remedies: ["Remedy 1", "Remedy 2"] });
  res.send("Remedy data"); //Added a placeholder

});

// ************************************************************************************
// * Serve the static files (the built React application)
// * This is crucial for serving your React app's HTML, JavaScript, and CSS.
// ************************************************************************************
app.use(express.static(path.join(__dirname, 'build')));

// ************************************************************************************
// * Catch-all route:  Redirect any unknown route to index.html
// * This is essential for React Router to work correctly.  It allows React to
// * handle the client-side routing.
// ************************************************************************************
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
