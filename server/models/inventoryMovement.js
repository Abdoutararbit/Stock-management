const mongoose = require("mongoose");

const inventoryMovementSchema = new mongoose.Schema({
  part: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SparePart",
  },
  quantity: {
    type: Number,
    required: true,
  },
  movementType: {
    type: String,
    enum: ["In", "Out"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reference: {
    type: String,
  },
});

module.exports = mongoose.model("InventoryMovement", inventoryMovementSchema);
