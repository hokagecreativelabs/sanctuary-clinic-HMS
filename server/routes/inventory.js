const express = require("express");
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// ➤ Add new stock item
router.post("/", async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get all stock items
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ➤ Update stock
router.put("/:id", async (req, res) => {
  try {
    const updatedStock = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStock) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete stock item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // ✅ Use `module.exports`
