const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const inventoryRoutes = require("./routes/inventory");
const billingRoutes = require("./routes/billing");
const reportRoutes = require("./routes/reports");


const authMiddleware = require("./middleware/authMiddleware"); // Import middleware

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/patients", authMiddleware, patientRoutes); // 🔐 Protected
app.use("/api/inventory", authMiddleware, inventoryRoutes); // 🔐 Protected
app.use("/api/billing", authMiddleware, billingRoutes); // 🔐 Protected
app.use("/api/reports", authMiddleware, reportRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
