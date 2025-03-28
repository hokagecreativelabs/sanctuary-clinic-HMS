const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: String, required: true },
  medicalHistory: { type: [String], default: [] },
  treatmentRecords: [
    {
      date: { type: Date, default: Date.now },
      diagnosis: String,
      prescription: String,
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema); // ✅ Use `module.exports`
