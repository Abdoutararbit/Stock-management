const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define routes
const sparePartRoutes = require("./routes/sparePartRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const inventoryMovementRoutes = require("./routes/inventoryMovementRoutes"); // Add this line

app.use("/api/spare-parts", sparePartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/inventory-movements", inventoryMovementRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
