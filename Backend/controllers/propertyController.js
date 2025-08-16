const Property = require("../models/property");

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const ownerId = req.user ? req.user._id : null; // get from authenticated user
    if (!ownerId) return res.status(400).json({ message: "Owner ID required" });

    const newProperty = new Property({ ...req.body, ownerId });
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create property error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Get all properties of this owner
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties", error: err.message });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property", error: err.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error updating property", error: err.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting property", error: err.message });
  }
};
