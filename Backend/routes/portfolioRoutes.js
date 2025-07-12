const express = require("express");
const router = express.Router();
const {
  getPortfolioItems,
  getPortfolioItemById,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware"); // Admin protection
const upload = require("../config/multerConfig"); // Multer for file uploads

// Public routes for fetching portfolio items
router.get("/", getPortfolioItems);
router.get("/:id", getPortfolioItemById); // Optional: if you want a public single view

// Admin routes for managing portfolio items (protected)
router.post("/", protect, upload.single("image"), addPortfolioItem);
router.put("/:id", protect, upload.single("image"), updatePortfolioItem);
router.delete("/:id", protect, deletePortfolioItem);

module.exports = router;
