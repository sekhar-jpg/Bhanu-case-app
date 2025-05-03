const express = require('express');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Import custom routes
const caseRoutes = require('./routes/caseRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// ------------------ Image Upload Setup ------------------ //
// Create uploads folder if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `face_${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

// ✅ Make uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Analyze face endpoint (placeholder AI response)
app.post("/analyze-face", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  console.log("Face image saved:", req.file.filename);

  // Dummy response (later integrate AI)
  res.json({
    message: "Image received",
    file: req.file.filename,
    aiResult: {
      facialType: "Carbonic",
      constitution: "Phosphoric",
      remedies: ["Calcarea carb", "Phosphorus", "Lycopodium"]
    }
  });
});
// -------------------------------------------------------- //

// Remedy logic
const remediesDatabase = {
  headache: ["Belladonna", "Nux Vomica", "Gelsemium"],
  nausea: ["Nux Vomica", "Ipecac", "Arsenicum album"],
  // Add more remedies and symptoms here as needed
};

const getRemediesFromModel = (description) => {
  if (!description || typeof description !== 'string') {
    return ["Error: No valid description provided"];
  }

  const symptoms = description.toLowerCase();
  let remedies = [];

  if (symptoms.includes("headache")) {
    remedies = remedies.concat(remediesDatabase.headache);
  }
  if (symptoms.includes("nausea")) {
    remedies = remedies.concat(remediesDatabase.nausea);
  }

  return remedies.length ? remedies : ["No matching remedies found"];
};

// Remedy API endpoint
app.post('/api/get-remedy', (req, res) => {
  const { description } = req.body;
  console.log('Received description:', description);

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: "Description is required and should be a valid string" });
  }

  const remedies = getRemediesFromModel(description);
  res.json({ remedies });
});

// Use case routes
app.use('/submit-case', caseRoutes);

// ------------------ Serve Static Files and Frontend ------------------ //
app.use(express.static(path.join(__dirname, 'build'))); // Change 'public' to 'build'

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // Change 'public' to 'build'
});
// -------------------------------------------------------------------- //

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
