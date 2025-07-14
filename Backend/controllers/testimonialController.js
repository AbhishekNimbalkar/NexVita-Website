// controllers/testimonialController.js
const Testimonial = require("../models/Testimonial");
const path = require("path");
const fs = require("fs");

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching testimonials." });
  }
};

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial by ID
// @access  Public
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching testimonial." });
  }
};

// @route   POST /api/testimonials
// @desc    Create a new testimonial
// @access  Private (Admin - assuming auth middleware later)
exports.createTestimonial = async (req, res) => {
  try {
    const { personName, companyName, description, rating } = req.body;
    let imageUrl = "";

    // Check if an image was uploaded
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Image upload is required." });
    }

    const newTestimonial = new Testimonial({
      personName,
      companyName,
      description,
      imageUrl,
      rating: Number(rating), // Ensure rating is a number
    });

    await newTestimonial.save();
    res
      .status(201)
      .json({
        message: "Testimonial created successfully!",
        testimonial: newTestimonial,
      });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    if (req.file) {
      // If there's an error, delete the uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting uploaded file:", err);
      });
    }
    res
      .status(500)
      .json({ message: "Server error while creating testimonial." });
  }
};

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
// @access  Private (Admin - assuming auth middleware later)
exports.updateTestimonial = async (req, res) => {
  try {
    const { personName, companyName, description, rating } = req.body;
    const updateData = {
      personName,
      companyName,
      description,
      rating: Number(rating),
    };

    // If a new file is uploaded, update imageUrl and remove old file
    if (req.file) {
      const oldTestimonial = await Testimonial.findById(req.params.id);
      if (oldTestimonial && oldTestimonial.imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          oldTestimonial.imageUrl
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err)
              console.error("Error deleting old testimonial image:", err);
          });
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      if (req.file) {
        // Clean up newly uploaded file if testimonial not found
        fs.unlink(req.file.path, (err) => {
          if (err)
            console.error("Error deleting uploaded file during update:", err);
        });
      }
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res
      .status(200)
      .json({
        message: "Testimonial updated successfully!",
        testimonial: updatedTestimonial,
      });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    if (req.file) {
      // Clean up newly uploaded file if error occurs
      fs.unlink(req.file.path, (err) => {
        if (err)
          console.error(
            "Error deleting uploaded file after update error:",
            err
          );
      });
    }
    res
      .status(500)
      .json({ message: "Server error while updating testimonial." });
  }
};

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private (Admin - assuming auth middleware later)
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    // Delete the associated image file
    if (testimonial.imageUrl) {
      const imagePath = path.join(__dirname, "..", testimonial.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting testimonial image:", err);
        });
      }
    }

    res.status(200).json({ message: "Testimonial deleted successfully!" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting testimonial." });
  }
};
