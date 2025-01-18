const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { validateObjectId } = require("../middleware/validateObjectId");

router.get("/", categoryController.getCategories);
router.get("/:id", validateObjectId, categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.put("/:id", validateObjectId, categoryController.updateCategory);
router.delete("/:id", validateObjectId, categoryController.deleteCategory);

module.exports = router;











