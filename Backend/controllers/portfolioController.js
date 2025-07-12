const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/Portfolio");
const fs = require("fs");
const path = require("path");

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolioItems = asyncHandler(async (req, res) => {
  const portfolioItems = await Portfolio.find().sort({ createdAt: -1 }); // Sort by newest first
  res.status(200).json(portfolioItems);
});

// @desc    Get single portfolio item by ID
// @route   GET /api/portfolio/:id
// @access  Public (or Private if only admin can view single item)
const getPortfolioItemById = asyncHandler(async (req, res) => {
  const portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    res.status(404);
    throw new Error("Portfolio item not found");
  }

  res.status(200).json(portfolioItem);
});

// @desc    Add a new portfolio item
// @route   POST /api/portfolio
// @access  Private (Admin only)
const addPortfolioItem = asyncHandler(async (req, res) => {
  const { title, link } = req.body;

  if (!title || !link) {
    res.status(400);
    throw new Error("Please enter all fields (title, link)");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image for the portfolio item");
  }

  // Construct the image URL relative to the public uploads folder
  const imageUrl = `/uploads/portfolio/${req.file.filename}`;

  const portfolioItem = await Portfolio.create({
    title,
    link,
    imageUrl,
  });

  res.status(201).json(portfolioItem);
});

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Admin only)
const updatePortfolioItem = asyncHandler(async (req, res) => {
  const { title, link } = req.body;
  const portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    res.status(404);
    throw new Error("Portfolio item not found");
  }

  let updatedImageUrl = portfolioItem.imageUrl;

  // If a new file is uploaded, update the image and delete the old one
  if (req.file) {
    // Delete old image file
    const oldImagePath = path.join(__dirname, "..", portfolioItem.imageUrl);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    updatedImageUrl = `/uploads/portfolio/${req.file.filename}`;
  }

  portfolioItem.title = title || portfolioItem.title;
  portfolioItem.link = link || portfolioItem.link;
  portfolioItem.imageUrl = updatedImageUrl;

  const updatedItem = await portfolioItem.save();

  res.status(200).json(updatedItem);
});

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin only)
const deletePortfolioItem = asyncHandler(async (req, res) => {
  const portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    res.status(404);
    throw new Error("Portfolio item not found");
  }

  // Delete the associated image file from the server
  const imagePath = path.join(__dirname, "..", portfolioItem.imageUrl);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await portfolioItem.deleteOne(); // Use deleteOne() instead of remove()
  res.status(200).json({ message: "Portfolio item removed" });
});

module.exports = {
  getPortfolioItems,
  getPortfolioItemById,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
