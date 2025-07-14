// routes/testimonialRoutes.js
const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Import fs for directory check

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the upload directory exists
    const uploadPath = path.join(
      __dirname,
      "..",
      process.env.UPLOAD_FOLDER || "uploads"
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Public routes
router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getTestimonialById);

// Admin-only routes (assuming you'll add authentication middleware later)
router.post(
  "/",
  upload.single("image"),
  testimonialController.createTestimonial
);
router.put(
  "/:id",
  upload.single("image"),
  testimonialController.updateTestimonial
);
router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;
