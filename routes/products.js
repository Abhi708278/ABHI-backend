const express = require("express");
const {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
    anylisis,
    updateAnylisis
} = require("../AdminPanel/product.js"); 

const { protectRoute, adminRoute } = require("../middleware/authmiddleware.js");
const router = express.Router();

// Routes
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations/:count", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/anylisis", protectRoute, adminRoute, anylisis);
router.post("/update", protectRoute, adminRoute, updateAnylisis);

module.exports = router;

