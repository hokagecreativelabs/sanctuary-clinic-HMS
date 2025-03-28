const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create an Invoice
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { patientId, services, totalAmount, paymentStatus } = req.body;

    // Ensure patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const newInvoice = new Billing({ patientId, services, totalAmount, paymentStatus });
    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Invoices
router.get("/", authMiddleware, async (req, res) => {
  try {
    const invoices = await Billing.find().populate("patientId", "name age");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Invoice by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id).populate("patientId", "name age");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update Payment Status
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const updatedInvoice = await Billing.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!updatedInvoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete an Invoice
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedInvoice = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
