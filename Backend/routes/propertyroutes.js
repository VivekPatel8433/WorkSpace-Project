const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware(["owner"]), createProperty);
router.get("/", authMiddleware(["owner"]), getProperties);

router.route("/:id")
  .get(authMiddleware, getProperty)
  .put(authMiddleware, updateProperty)
  .delete(authMiddleware, deleteProperty);

module.exports = router;
