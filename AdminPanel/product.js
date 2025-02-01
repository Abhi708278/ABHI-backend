// const Product = require("../models/products");
// const Admin = require("../models/admin");

// // Create a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const {
//       productId, name, description, category, price, 
//       discountPrice, stockQuantity, minimumQuantity, 
//       tags, images, videos, isFeatured
//     } = req.body;

//     // Check if the product ID already exists
//     const existingProduct = await Product.findOne({ productId });
//     if (existingProduct) {
//       return res.status(400).json({ success: false, message: "The entered Product ID already exists. Please enter a unique Product ID." });
//     }
//     const product = new Product({
//       productId, 
//       name,
//       description,
//       category,
//       price,
//       discountPrice,
//       stockQuantity,
//       minimumQuantity,
//       tags: tags ? tags.split(",") : [],
//       images: images ? images.split(",") : [],
//       videos: videos ? videos.split(",") : [],
//       isFeatured,
//     });
//     await product.save();
//     res.status(201).json({ success: true, message: "Product Added Successfully", data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update creat product data - 
// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;  
//         const updateData = req.body; 

//         // Check if product exists
//         const product = await Product.findOne({ productId: id });
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // Update product fields dynamically
//         Object.keys(updateData).forEach((key) => {
//             product[key] = updateData[key];
//         });

//         await product.save(); // Save updated product

//         res.status(200).json({
//             success: true,
//             message: "Product updated successfully",
//             updatedProduct: product
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
//     }
// };

// // Get featured products
// exports.getFeaturedProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ isFeatured: true });
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// // Get products by category
// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const category = req.params.category.toLowerCase();  // (1) Convert to lowercase
//     const { limit, page, sort } = req.query; // (2) Get filters from query params

//     // (3) Validate category input
//     if (!category) {
//       return res.status(400).json({ success: false, message: "Category is required" });
//     }

//     // (4) Pagination: Default limit = 10, Default page = 1
//     const limitNumber = parseInt(limit) || 10;
//     const pageNumber = parseInt(page) || 1;
//     const skip = (pageNumber - 1) * limitNumber;

//     // (5) Sorting logic
//     let sortOption = {};
//     if (sort) {
//       if (sort === "price_asc") sortOption.price = 1;
//       else if (sort === "price_desc") sortOption.price = -1;
//       else if (sort === "name") sortOption.name = 1;
//     }

//     // (6) Fetch products with filtering, pagination, and sorting
//     const products = await Product.find({ category })
//       .sort(sortOption)
//       .skip(skip)
//       .limit(limitNumber);

//     // (7) Response
//     res.status(200).json({ 
//       success: true, 
//       total: products.length, 
//       page: pageNumber, 
//       limit: limitNumber, 
//       data: products 
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get recommended products (how many product seen so entr the count = 5)
// exports.getRecommendedProducts = async (req, res) => {
//   try {
//     const count  = req.params.count;
//     const products = await Product.find().limit(count); 
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Toggle product featured status
// exports.toggleFeaturedProduct = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
 
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }


//     product.isFeatured = !product.isFeatured;
//     await product.save();
//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Delete a product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// //analysis of product....... 
// exports.anylisis = async (req, res) => {
//   try {
//     console.log("hit");
//     //const anylisisId  = "67991e43dfb6162110ede065";
//     // const anylisisData = await Admin.findById(anylisisId); 
//     const anylisisData = await Admin.find();
    
//     if(!anylisisData){
//       res.status(404).json({ success: false, message: "Not Found" });
//     }
//     res.status(201).json({ success: true, data: anylisisData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// exports.updateAnylisis = async (req, res) => {
//   try {
//     const {totalUser,totalProducts,totalSales,totalRevenue} = req.body;
//     const anylisisData = new Admin({totalUser,totalProducts,totalSales,totalRevenue});
//     const savedData =await anylisisData.save();
//     if(!savedData){
//       res.status(404).json({ success: false, message: "Not Found" });
//     }
//     res.status(201).json({ success: true, data: savedData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };








const Product = require("../models/products");
const Admin = require("../models/admin");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { productId, name, description, category, price, discountPrice, stockQuantity, minimumQuantity, tags, images, videos, isFeatured } = req.body;

    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: "The entered Product ID already exists. Please enter a unique Product ID." });
    }

    const product = new Product({
      productId, name, description, category, price, discountPrice, stockQuantity, minimumQuantity,
      tags: tags ? tags.split(",") : [], images: images ? images.split(",") : [], videos: videos ? videos.split(",") : [], isFeatured,
    });
    await product.save();
    // res.status(201).json({ success: true, message: "Product Added Successfully", data: product });
    res.status(201).json({ message: "Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
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

// Update a product by productId
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    Object.assign(product, updateData);
    await product.save();
    res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
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
    const category = req.params.category.toLowerCase();
    const { limit, page, sort } = req.query;
    const limitNumber = parseInt(limit) || 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * limitNumber;
    let sortOption = {};

    if (sort === "price_asc") sortOption.price = 1;
    else if (sort === "price_desc") sortOption.price = -1;
    else if (sort === "name") sortOption.name = 1;

    const products = await Product.find({ category }).sort(sortOption).skip(skip).limit(limitNumber);
    res.status(200).json({ success: true, total: products.length, page: pageNumber, limit: limitNumber, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get recommended products
exports.getRecommendedProducts = async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 5;
    const products = await Product.find().limit(count);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Toggle product featured status by productId
exports.toggleFeaturedProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a product by productId
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ productId });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Analysis of products
exports.analysis = async (req, res) => {
  try {
    const analysisData = await Admin.find();
    if (!analysisData) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, data: analysisData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update analysis
exports.updateAnalysis = async (req, res) => {
  try {
    const { totalUser, totalProducts, totalSales, totalRevenue } = req.body;
    const analysisData = new Admin({ totalUser, totalProducts, totalSales, totalRevenue });
    const savedData = await analysisData.save();
    if (!savedData) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};   