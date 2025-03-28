const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Patient = require("../models/Patient");
const Billing = require("../models/Billing");
const Inventory = require("../models/Inventory");


const router = express.Router();

// 📌 Patient Visit Trends
router.get("/patient-trends", authMiddleware, async (req, res) => {
  try {
    const { start, end } = req.query;
    const startDate = start ? new Date(start) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end) : new Date();

    const trends = await Patient.aggregate([
      {
        $match: { "treatmentRecords.date": { $gte: startDate, $lte: endDate } },
      },
      {
        $unwind: "$treatmentRecords",
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$treatmentRecords.date" } },
          totalPatients: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, trends });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching patient trends", error });
  }
});

// 📌 Financial Summary
router.get("/financial-summary", authMiddleware, async (req, res) => {
  try {
    const { start, end } = req.query;
    const startDate = start ? new Date(start) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end) : new Date();

    const invoices = await Billing.find({ date: { $gte: startDate, $lte: endDate } });

    const totalRevenue = invoices.reduce((sum, bill) => sum + bill.totalAmount, 0);
    const paidRevenue = invoices.filter((b) => b.status === "Paid").reduce((sum, bill) => sum + bill.totalAmount, 0);
    const pendingRevenue = totalRevenue - paidRevenue;

    res.json({ success: true, totalRevenue, paidRevenue, pendingRevenue });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching financial summary", error });
  }
});

// 📌 Inventory Summary
router.get("/inventory-summary", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const lowStockItems = inventory.filter((item) => item.quantity <= item.reorderLevel).length;

    res.json({
      success: true,
      totalItems: inventory.length,
      lowStockItems,
      inventory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching inventory summary", error });
  }
});

module.exports = router;
