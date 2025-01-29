const Product = require("../models/products");
const Admin = require("../models/admin");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, stockQuantity,
      minimumQuantity, tags, images, videos, category, isFeatured
    } = req.body;

    const product = new Product({
      name, description, price, discountPrice, stockQuantity,
      minimumQuantity, tags: tags ? tags.split(",") : [],
      images: images ? images.split(",") : [],
      videos: videos ? videos.split(",") : [],
      category, isFeatured  });
    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get recommended products (example logic, can be customized)
exports.getRecommendedProducts = async (req, res) => {
  try {
    const count  = req.params.count;
    const products = await Product.find().limit(count); // Example logic to fetch recommended products
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Toggle product featured status
exports.toggleFeaturedProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
 
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }


    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//analysis of product....... 
exports.anylisis = async (req, res) => {
  try {
    console.log("hit");
    //const anylisisId  = "67991e43dfb6162110ede065";
    // const anylisisData = await Admin.findById(anylisisId); 
    const anylisisData = await Admin.find();
    
    if(!anylisisData){
      res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(201).json({ success: true, data: anylisisData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateAnylisis = async (req, res) => {
  try {
    const {totalUser,totalProducts,totalSales,totalRevenue} = req.body;
    const anylisisData = new Admin({totalUser,totalProducts,totalSales,totalRevenue});
    const savedData =await anylisisData.save();
    if(!savedData){
      res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

