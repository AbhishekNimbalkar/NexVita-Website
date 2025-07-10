const mongoose = require("mongoose");

const CompanyLogoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    // You could add more fields if needed, e.g., description, order, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyLogo", CompanyLogoSchema);
