const express = require("express");
const {
    createProduct,
    getAllProducts,
    updateProduct,
    getFeaturedProducts,
    getProductsByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
    deleteProduct,
    analysis,
    updateAnalysis
} = require("../AdminPanel/product.js"); 

const { protectRoute, adminRoute } = require("../middleware/authmiddleware.js");
const router = express.Router();

// Routes (ordered as per product.js)
router.post("/", protectRoute, adminRoute, createProduct);
router.get("/allproducts", protectRoute, adminRoute, getAllProducts);
router.patch("/update/:productId", protectRoute, adminRoute, updateProduct);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations/:count", getRecommendedProducts);
router.patch("/featured/:productId", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:productId", protectRoute, adminRoute, deleteProduct);
router.get("/analysis", protectRoute, adminRoute, analysis);
router.post("/update-analysis", protectRoute, adminRoute, updateAnalysis);

module.exports = router;
