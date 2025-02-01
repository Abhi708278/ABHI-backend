const Category = require("../models/category");

// 🟢 Get all categories sorted by position
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ position: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🟢 Add a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, position, subcategories } = req.body;

    const category = new Category({
      name,
      position: position || 0,
      subcategories: subcategories || [],
    });

    const savedCategory = await category.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🟢 Update category order
exports.reorderCategories = async (req, res) => {
  try {
    const { updatedCategories } = req.body;

    if (!Array.isArray(updatedCategories) || updatedCategories.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    for (const category of updatedCategories) {
      await Category.findByIdAndUpdate(category._id, { position: category.position });
    }

    res.status(200).json({ success: true, message: "Category order updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🟢 Update subcategory order within a category
exports.reorderSubcategories = async (req, res) => {
  try {
    const { categoryId, updatedSubcategories } = req.body;

    if (!categoryId || !Array.isArray(updatedSubcategories)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    category.subcategories = updatedSubcategories;
    await category.save();

    res.status(200).json({ success: true, message: "Subcategory order updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🟢 Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
