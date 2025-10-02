const Workspace = require("../models/workspace");

// Create a new workspace
exports.createWorkspace = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });

    const workspace = new Workspace({ ...req.body, ownerId: req.user.id });
    await workspace.save();
    res.status(201).json(workspace);
  } catch (err) {
    console.error("Workspace save error:", err);
    res.status(500).json({ message: "Error creating workspace", error: err.message });
  }
};

// Get all workspaces of the logged-in user
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ ownerId: req.user.id });
    res.json(workspaces);
    
  } catch (err) {
    console.error("Fetch workspaces error:", err);
    res.status(500).json({ message: "Error fetching workspaces", error: err.message });
  }
};

// Get single workspace by ID
exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });
    res.json(workspace);
  } catch (err) {
    console.error("Fetch workspace error:", err);
    res.status(500).json({ message: "Error fetching workspace", error: err.message });
  }
};

// Update workspace by ID
exports.updateWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });
    res.json(workspace);
  } catch (err) {
    console.error("Update workspace error:", err);
    res.status(500).json({ message: "Error updating workspace", error: err.message });
  }
};

// Delete workspace by ID
exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(req.params.id);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });
    res.json({ message: "Workspace deleted" });
  } catch (err) {
    console.error("Delete workspace error:", err);
    res.status(500).json({ message: "Error deleting workspace", error: err.message });
  }
};

// All the workspaces available
exports.getAllWorkspaces = async (req, res) => {
  try {
    const workspace = await Workspace.find();
    if(!workspace) return res.status(404).json({message: "Workspace not found"});
    res.json({message: "Not found"});
  } catch (err) {
    console.error("GetAllWorkspace error", err); 
    res.status(500).json({messsage: "Server error", eror: err.message});
  }
}
