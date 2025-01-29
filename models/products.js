const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      min: 0,
      required: true,
    },
    minimumQuantity: {
      type: Number,
      min: 1,
      required: true,
    },
    tags: {
      type: [String], // Array of strings
      default: [],
    },
    images: {
      type: [String], 
      required: [true, "At least one image is required"],
    },
    videos: {
      type: [String], 
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
