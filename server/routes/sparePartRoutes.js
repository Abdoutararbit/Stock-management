const express = require("express");
const router = express.Router();
const SparePart = require("../models/sparePart");

// Create a new spare part
router.post("/", async (req, res) => {
  try {
    const { name, category, supplier, quantity, price, description } = req.body;
    const newSparePart = new SparePart({
      name,
      category,
      supplier,
      quantity,
      price,
      description,
    });
    const savedSparePart = await newSparePart.save();
    res.status(201).json(savedSparePart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all spare parts
router.get("/", async (req, res) => {
  try {
    const spareParts = await SparePart.find()
      .populate("category")
      .populate("supplier");
    res.status(200).json(spareParts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a spare part by ID
router.get("/:id", async (req, res) => {
  try {
    const sparePart = await SparePart.findById(req.params.id)
      .populate("category")
      .populate("supplier");
    if (!sparePart)
      return res.status(404).json({ error: "Spare part not found" });
    res.status(200).json(sparePart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a spare part by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, category, supplier, quantity, price, description } = req.body;
    const updatedSparePart = await SparePart.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        supplier,
        quantity,
        price,
        description,
        lastUpdated: Date.now(),
      },
      { new: true }
    )
      .populate("category")
      .populate("supplier");
    if (!updatedSparePart)
      return res.status(404).json({ error: "Spare part not found" });
    res.status(200).json(updatedSparePart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a spare part by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSparePart = await SparePart.findByIdAndDelete(req.params.id);
    if (!deletedSparePart)
      return res.status(404).json({ error: "Spare part not found" });
    res.status(200).json({ message: "Spare part deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
