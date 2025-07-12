const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title for the portfolio item"],
    trim: true,
  },
  link: {
    type: String,
    required: [true, "Please add a link for the portfolio item"],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, "Please add an image URL"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
