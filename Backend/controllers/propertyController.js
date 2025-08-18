const Property = require("../models/property");


exports.createProperty = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });

    const property = new Property({ ...req.body, ownerId: req.user.id });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error("Property save error:", err);
    res.status(500).json({ message: "Error creating property", error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    res.json(properties);
  } catch (err) {
    console.error("Fetch properties error:", err);
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
