const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      // enum: ["Electronics", "Fashion", "Home", "Books", "Grocery", "Other"],
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value < this.price; // Ensure discountPrice is less than price
        },
        message: "Discount price must be less than the original price",
      },
    },
    stockQuantity: {
      type: Number,
      min: 0,
      required: true,
      default: 0, // Default stock as 0
    },
    minimumQuantity: {
      type: Number,
      min: 1,
      required: true,
      default: 1, // Default minimum order as 1
    },
    tags: {
      type: [String],
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;     
