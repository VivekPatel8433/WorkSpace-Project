const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authMiddleware = require("../middleware/auth");

// Create & Get all properties
router.route("/")
  .post(authMiddleware, propertyController.createProperty)
  .get(authMiddleware, propertyController.getProperties);

// Get, update, delete single property
router.route("/:id")
  .get(authMiddleware, propertyController.getProperty)
  .put(authMiddleware, propertyController.updateProperty)
  .delete(authMiddleware, propertyController.deleteProperty);

module.exports = router;
