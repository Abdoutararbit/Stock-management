const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  parts: [
    {
      part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SparePart",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  totalAmount: {
    type: Number,
  },
});

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
