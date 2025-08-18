// routes/propertyroutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { createProperty, getProperties, getProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");

// all routes require auth
router.post("/", authMiddleware(), createProperty);
router.get("/", authMiddleware(), getProperties);
router.get("/:id", authMiddleware(), getProperty);
router.put("/:id", authMiddleware(), updateProperty);
router.delete("/:id", authMiddleware(), deleteProperty);

module.exports = router;
