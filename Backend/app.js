require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const companyLogoRoutes = require("../Backend/routes/companyLogoRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Only allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204, // For legacy browser support
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS configuration
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, process.env.UPLOAD_FOLDER))
);
app.use("/api/portfolio", portfolioRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/company-logos", companyLogoRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Work Process API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
