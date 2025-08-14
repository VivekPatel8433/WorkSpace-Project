const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertycontroller"); // make sure casing is correct

router.route("/")
  .post(createProperty)
  .get(getProperties);

router.route("/:id")
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;
