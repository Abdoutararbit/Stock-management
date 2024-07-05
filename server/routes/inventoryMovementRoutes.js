const express = require("express");
const router = express.Router();
const InventoryMovement = require("../models/inventoryMovement");
const SparePart = require("../models/sparePart");

// Create a new inventory movement
router.post("/", async (req, res) => {
  try {
    const { part, quantity, type, description } = req.body;

    // Adjust the quantity in SparePart
    const sparePart = await SparePart.findById(part);
    if (!sparePart)
      return res.status(404).json({ error: "Spare part not found" });

    if (type === "IN") {
      sparePart.quantity += quantity;
    } else if (type === "OUT") {
      sparePart.quantity -= quantity;
    }

    await sparePart.save();

    const newInventoryMovement = new InventoryMovement({
      part,
      quantity,
      type,
      description,
    });
    const savedInventoryMovement = await newInventoryMovement.save();
    res.status(201).json(savedInventoryMovement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all inventory movements
router.get("/", async (req, res) => {
  try {
    const inventoryMovements = await InventoryMovement.find().populate("part");
    res.status(200).json(inventoryMovements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an inventory movement by ID
router.get("/:id", async (req, res) => {
  try {
    const inventoryMovement = await InventoryMovement.findById(
      req.params.id
    ).populate("part");
    if (!inventoryMovement)
      return res.status(404).json({ error: "Inventory movement not found" });
    res.status(200).json(inventoryMovement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an inventory movement by ID
router.put("/:id", async (req, res) => {
  try {
    const { part, quantity, type, description } = req.body;
    const inventoryMovement = await InventoryMovement.findById(req.params.id);
    if (!inventoryMovement)
      return res.status(404).json({ error: "Inventory movement not found" });

    // Adjust the quantity in SparePart
    const sparePart = await SparePart.findById(inventoryMovement.part);
    if (!sparePart)
      return res.status(404).json({ error: "Spare part not found" });

    // Revert the previous movement
    if (inventoryMovement.type === "IN") {
      sparePart.quantity -= inventoryMovement.quantity;
    } else if (inventoryMovement.type === "OUT") {
      sparePart.quantity += inventoryMovement.quantity;
    }

    // Apply the new movement
    if (type === "IN") {
      sparePart.quantity += quantity;
    } else if (type === "OUT") {
      sparePart.quantity -= quantity;
    }

    await sparePart.save();

    inventoryMovement.part = part;
    inventoryMovement.quantity = quantity;
    inventoryMovement.type = type;
    inventoryMovement.description = description;
    const updatedInventoryMovement = await inventoryMovement.save();

    res.status(200).json(updatedInventoryMovement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an inventory movement by ID
router.delete("/:id", async (req, res) => {
  try {
    const inventoryMovement = await InventoryMovement.findById(req.params.id);
    if (!inventoryMovement)
      return res.status(404).json({ error: "Inventory movement not found" });

    // Adjust the quantity in SparePart
    const sparePart = await SparePart.findById(inventoryMovement.part);
    if (!sparePart)
      return res.status(404).json({ error: "Spare part not found" });

    if (inventoryMovement.type === "IN") {
      sparePart.quantity -= inventoryMovement.quantity;
    } else if (inventoryMovement.type === "OUT") {
      sparePart.quantity += inventoryMovement.quantity;
    }

    await sparePart.save();
    await inventoryMovement.remove();

    res.status(200).json({ message: "Inventory movement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
