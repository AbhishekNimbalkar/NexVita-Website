const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const companyLogoController = require("../controllers/companyLogoController");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", process.env.UPLOAD_FOLDER);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      )
    );
  },
});

// Routes
router.get("/", companyLogoController.getCompanyLogos);
router.post("/", upload.single("logo"), companyLogoController.addCompanyLogo);
router.put(
  "/:id",
  upload.single("logo"),
  companyLogoController.updateCompanyLogo
);
router.delete("/:id", companyLogoController.deleteCompanyLogo);

module.exports = router;
