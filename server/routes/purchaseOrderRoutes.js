const express = require("express");
const router = express.Router();
const PurchaseOrder = require("../models/purchaseOrder");

// Create a new purchase order
router.post("/", async (req, res) => {
  try {
    const { orderNumber, supplier, parts, status, totalAmount } = req.body;
    const newPurchaseOrder = new PurchaseOrder({
      orderNumber,
      supplier,
      parts,
      status,
      totalAmount,
    });
    const savedPurchaseOrder = await newPurchaseOrder.save();
    res.status(201).json(savedPurchaseOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all purchase orders
router.get("/", async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find()
      .populate("supplier")
      .populate("parts.part");
    res.status(200).json(purchaseOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a purchase order by ID
router.get("/:id", async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id)
      .populate("supplier")
      .populate("parts.part");
    if (!purchaseOrder)
      return res.status(404).json({ error: "Purchase order not found" });
    res.status(200).json(purchaseOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a purchase order by ID
router.put("/:id", async (req, res) => {
  try {
    const { orderNumber, supplier, parts, status, totalAmount } = req.body;
    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      {
        orderNumber,
        supplier,
        parts,
        status,
        totalAmount,
        orderDate: Date.now(),
      },
      { new: true }
    )
      .populate("supplier")
      .populate("parts.part");
    if (!updatedPurchaseOrder)
      return res.status(404).json({ error: "Purchase order not found" });
    res.status(200).json(updatedPurchaseOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a purchase order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPurchaseOrder)
      return res.status(404).json({ error: "Purchase order not found" });
    res.status(200).json({ message: "Purchase order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
