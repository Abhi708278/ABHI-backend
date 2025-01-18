const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController"); // Correct path to the controller
const { validateObjectId } = require("../middleware/validateObjectId"); // Create middleware in a separate file for reuse

// Route definitions
router.get("/", itemController.getItems); // Get all items
router.get("/:id", validateObjectId, itemController.getItemById); // Get a single item by ID
router.post("/", itemController.createItem); // Create a new item
router.put("/:id", validateObjectId, itemController.updateItem); // Update an item
router.delete("/:id", validateObjectId, itemController.deleteItem); // Delete an item

module.exports = router;











