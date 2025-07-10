// backend/controllers/authController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // If credentials are valid, generate token
    res.json({
      message: "Login successful",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Register a new admin (for initial setup, or if needed)
// @route   POST /api/admin/register
// @access  Public (should be protected in production after first admin is created)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    admin = new Admin({
      email,
      password,
      role: "admin", // Ensure the role is 'admin'
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update admin email
// @route   PUT /api/admin/email
// @access  Private (Admin only)
exports.updateAdminEmail = async (req, res) => {
  const { newEmail, password } = req.body; // 'password' here is the current password for confirmation

  if (!newEmail || !password) {
    return res
      .status(400)
      .json({ message: "Please provide new email and current password." });
  }

  try {
    const admin = await Admin.findById(req.admin.id); // req.admin is set by the protect middleware

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Verify current password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password." });
    }

    // Check if new email is already taken by another admin
    const emailExists = await Admin.findOne({ email: newEmail });
    if (emailExists && emailExists._id.toString() !== admin._id.toString()) {
      return res
        .status(400)
        .json({ message: "This email is already in use by another account." });
    }

    admin.email = newEmail;
    await admin.save(); // Mongoose pre-save hook won't hash email, only password

    res.json({ message: "Email updated successfully!", email: admin.email });
  } catch (err) {
    console.error("Error updating admin email:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update admin password
// @route   PUT /api/admin/password
// @access  Private (Admin only)
exports.updateAdminPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide current and new password." });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters long." });
  }

  try {
    const admin = await Admin.findById(req.admin.id); // req.admin is set by the protect middleware

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Verify current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password." });
    }

    // Update password (pre-save hook in Admin model will hash it)
    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error updating admin password:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Example of a protected route handler (for later use)
exports.getAdminProfile = async (req, res) => {
  // req.admin will be available from the auth middleware
  res.json({
    message: "Admin profile data",
    admin: req.admin,
  });
};
