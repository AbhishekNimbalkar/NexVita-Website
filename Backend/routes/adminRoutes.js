// backend/routes/adminRoutes.js
const express = require("express");
const {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminEmail,
  updateAdminPassword,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Consider removing or heavily protecting this route after initial setup
router.get("/profile", protect, admin, getAdminProfile); // Example protected route

// New routes for updating credentials, protected by auth middleware
router.put("/email", protect, admin, updateAdminEmail);
router.put("/password", protect, admin, updateAdminPassword);

module.exports = router;
