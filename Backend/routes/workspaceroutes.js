const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

// All routes require authentication
router.post("/", authMiddleware(), createWorkspace);
router.get("/", authMiddleware(), getWorkspaces);
router.get("/:id", authMiddleware(), getWorkspace);
router.put("/:id", authMiddleware(), updateWorkspace);
router.delete("/:id", authMiddleware(), deleteWorkspace);

module.exports = router;
 