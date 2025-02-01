const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // Prevents a unique `_id` for each subcategory
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      min: 0,
      required: true,
    },
    subcategories: {
      type: [subcategorySchema], // Array of subcategory objects
      default: [], // Default value if no subcategories
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
