const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

router.route("/")
  .post(createWorkspace)
  .get(getWorkspaces);

router.route("/:id")
  .get(getWorkspace)
  .put(updateWorkspace)
  .delete(deleteWorkspace);

module.exports = router;
