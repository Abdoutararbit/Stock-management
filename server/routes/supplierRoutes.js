const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier");

// Create a new supplier
router.post("/", async (req, res) => {
  try {
    const { name, contactName, contactEmail, contactPhone, address } = req.body;
    const newSupplier = new Supplier({
      name,
      contactName,
      contactEmail,
      contactPhone,
      address,
    });
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a supplier by ID
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a supplier by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, contactName, contactEmail, contactPhone, address } = req.body;
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name,
        contactName,
        contactEmail,
        contactPhone,
        address,
        lastUpdated: Date.now(),
      },
      { new: true }
    );
    if (!updatedSupplier)
      return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a supplier by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier)
      return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
