const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 10000;

app.use(bodyParser.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://bhanuhomeopathy:sekhar123@cluster0.wm2pxqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Mongoose Schema
const caseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  followUpDate: Date // follow-up date
});

const Case = mongoose.model("Case", caseSchema);

// ✅ POST case submission
app.post("/submit-case", async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(200).json({ message: "Case submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting case", error });
  }
});

// ✅ GET follow-ups due today
app.get("/due-today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);

    const duePatients = await Case.find({
      followUpDate: {
        $gte: today,
        $lte: tomorrow
      }
    });

    res.json(duePatients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching due patients", error });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
