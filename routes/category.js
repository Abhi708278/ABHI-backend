const express = require("express");
const {
  getAllCategories,
  createCategory,
  reorderCategories,
  reorderSubcategories,
  deleteCategory,
} = require("../AdminPanel/category.js"); // Ensure the path is correct

// const { protectRoute, adminRoute } = require("../middleware/authmiddleware");
const router = express.Router();

// Routes
router.get("/",getAllCategories); // Get all categories
router.post("/",createCategory); // Add a new category
router.post("/reorder",reorderCategories); // Update category order
router.post("/subcategories/reorder",reorderSubcategories); // Update subcategory order
router.delete("/:id",deleteCategory); // Delete a category

module.exports = router;
