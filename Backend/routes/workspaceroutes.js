const express = require("express");
const router = express.Router();


const propertyController = require("../controllers/workspaceController");

// Routes
router.route("/")
  .post(propertyController.createProperty)
  .get(propertyController.getProperties);

router.route("/:id")
  .get(propertyController.getProperty)
  .put(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
