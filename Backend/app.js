require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes"); // New admin routes
const companyLogoRoutes = require("../Backend/routes/companyLogoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(
  "/uploads",
  express.static(path.join(__dirname, process.env.UPLOAD_FOLDER))
); // Serve static files

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/company-logos", companyLogoRoutes);
app.use("/api/admin", adminRoutes); // Use the new admin routes

app.get("/", (req, res) => {
  res.send("Work Process API is running");
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
