const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 10000;

app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect("mongodb+srv://Bhanuhomeopathy:sekhar123@cluster0.wm2pxqs.mongodb.net/BhanuDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define schema
const caseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  followUpDate: Date,
});

const Case = mongoose.model("Case", caseSchema);

// ✅ POST endpoint to submit case
app.post("/submit-case", async (req, res) => {
  const { name, phone, date, followUpDate } = req.body;
  try {
    const newCase = new Case({ name, phone, date, followUpDate });
    await newCase.save();
    res.status(201).json({ message: "Case submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting case" });
  }
});

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
