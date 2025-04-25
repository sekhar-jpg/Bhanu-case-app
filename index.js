const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 10000;

app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(
  'mongodb+srv://Bhanuhomeopathy:sekhar123@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Sample schema
const caseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
});

const Case = mongoose.model("Case", caseSchema);

// ✅ POST endpoint
app.post("/submit-case", async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: "Case submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit case", error });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
