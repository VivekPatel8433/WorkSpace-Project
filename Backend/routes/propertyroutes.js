const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("./controllers/propertyController");
const authMiddleware = require("../middleware/auth");

router.route("/") 
  .post(authMiddleware, createProperty)
  .get(authMiddleware, getProperties);

router.route("/:id")
  .get(authMiddleware, getProperty)
  .put(authMiddleware, updateProperty)
  .delete(authMiddleware, deleteProperty);

module.exports = router;
