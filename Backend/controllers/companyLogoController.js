// backend/controllers/companyLogoController.js
const CompanyLogo = require("../models/CompanyLogo");
const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`ERROR: Failed to delete file at path: ${filePath}`, err);
    } else {
      console.log(`INFO: Successfully deleted file at path: ${filePath}`);
    }
  });
};

exports.getCompanyLogos = async (req, res) => {
  try {
    const logos = await CompanyLogo.find({});
    res.status(200).json(logos);
  } catch (error) {
    console.error("ERROR: getCompanyLogos failed:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.addCompanyLogo = async (req, res) => {
  try {
    if (!req.file) {
      console.error("ERROR: No file uploaded for addCompanyLogo.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { name } = req.body;
    if (!name) {
      console.warn("WARN: Company name is missing. Deleting uploaded file.");
      deleteFile(req.file.path);
      return res.status(400).json({ message: "Company name is required" });
    }

    const logoUrl = `/uploads/${req.file.filename}`;
    console.log(`INFO: New logoUrl created: ${logoUrl}`);

    const newLogo = new CompanyLogo({
      name,
      logoUrl,
    });

    const savedLogo = await newLogo.save();
    console.log("INFO: Logo saved to DB successfully:", savedLogo);
    res.status(201).json(savedLogo);
  } catch (error) {
    if (req.file) {
      console.error(
        "ERROR: addCompanyLogo failed. Attempting to delete uploaded file:",
        req.file.path
      );
      deleteFile(req.file.path);
    }
    if (error.code === 11000) {
      console.error(
        "ERROR: Duplicate key error in addCompanyLogo:",
        error.message
      );
      return res
        .status(409)
        .json({ message: "Company with this name already exists" });
    }
    console.error(
      "CRITICAL ERROR: Unhandled exception in addCompanyLogo:",
      error
    );
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateCompanyLogo = async (req, res) => {
  try {
    console.log(
      `INFO: updateCompanyLogo request received for ID: ${req.params.id}`
    );
    console.log("INFO: req.body:", req.body);
    console.log("INFO: req.file:", req.file);

    const { id } = req.params;
    const { name } = req.body;
    let updateData = {};
    let oldLogoFilePathToDelete = null;

    const existingLogo = await CompanyLogo.findById(id);
    if (!existingLogo) {
      if (req.file) {
        console.warn(
          "WARN: Logo not found for update, deleting newly uploaded file."
        );
        deleteFile(req.file.path);
      }
      return res.status(404).json({ message: "Company logo not found" });
    }

    if (req.file) {
      oldLogoFilePathToDelete = path.join(
        __dirname,
        "..",
        existingLogo.logoUrl
      );
      updateData.logoUrl = `/uploads/${req.file.filename}`;
      console.log(
        `INFO: New file uploaded. Old path: ${oldLogoFilePathToDelete}, New URL: ${updateData.logoUrl}`
      );
    }

    if (name) {
      updateData.name = name;
      console.log(`INFO: New name provided: ${name}`);
    }

    if (Object.keys(updateData).length === 0) {
      console.warn(
        "WARN: No update data (name or file) provided for updateCompanyLogo."
      );
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res.status(400).json({
        message: "No update data provided. Provide a new name or a new logo.",
      });
    }

    const updatedLogo = await CompanyLogo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLogo) {
      console.error("ERROR: Logo not found after findByIdAndUpdate attempt.");
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res
        .status(404)
        .json({ message: "Company logo not found after update attempt" });
    }

    if (oldLogoFilePathToDelete && fs.existsSync(oldLogoFilePathToDelete)) {
      console.log(
        "INFO: Attempting to delete old logo file after successful update."
      );
      deleteFile(oldLogoFilePathToDelete);
    } else if (oldLogoFilePathToDelete) {
      console.log(
        "INFO: Old logo path existed, but file was not found (might already be deleted or path incorrect):",
        oldLogoFilePathToDelete
      );
    }

    console.log("INFO: Logo updated successfully:", updatedLogo);
    res.status(200).json(updatedLogo);
  } catch (error) {
    if (req.file) {
      console.error(
        "ERROR: updateCompanyLogo failed. Attempting to delete newly uploaded file:",
        req.file.path
      );
      deleteFile(req.file.path);
    }
    if (error.code === 11000) {
      console.error(
        "ERROR: Duplicate key error in updateCompanyLogo:",
        error.message
      );
      return res
        .status(409)
        .json({ message: "Company with this name already exists" });
    }
    console.error(
      "CRITICAL ERROR: Unhandled exception in updateCompanyLogo:",
      error
    );
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteCompanyLogo = async (req, res) => {
  try {
    console.log(
      `INFO: deleteCompanyLogo request received for ID: ${req.params.id}`
    );
    const { id } = req.params;
    const deletedLogo = await CompanyLogo.findByIdAndDelete(id);

    if (!deletedLogo) {
      console.warn("WARN: Logo not found for deletion.");
      return res.status(404).json({ message: "Company logo not found" });
    }

    const filePath = path.join(__dirname, "..", deletedLogo.logoUrl);
    if (fs.existsSync(filePath)) {
      console.log(`INFO: Attempting to delete associated file: ${filePath}`);
      deleteFile(filePath);
    } else {
      console.warn(
        `WARN: Associated file not found at path: ${filePath}. Skipping file deletion.`
      );
    }

    console.log("INFO: Company logo deleted successfully:", deletedLogo);
    res.status(200).json({ message: "Company logo deleted successfully" });
  } catch (error) {
    console.error(
      "CRITICAL ERROR: Unhandled exception in deleteCompanyLogo:",
      error
    );
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
