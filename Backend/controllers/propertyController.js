const Property = require("../models/property");


exports.createProperty = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" }); // middleware authentication that sets req.user

    const property = new Property({ ...req.body, ownerId: req.user.id }); // sets onwerId to be for the one who logged in! 
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
// exports.getProperty = async (req, res) => {
//   try {
//     if (!req.user?.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const property = await Property.findOne({
//       _id: req.params.id,
//       ownerId: req.user.id  // Only find properties owned by authenticated user
//     });

//     if (!property) {
//       return res.status(404).json({ message: "Property not found or access denied" });
//     }

//     res.json(property);
//   } catch (err) {
//     // Handle invalid ObjectId format
//     if (err.name === 'CastError') {
//       return res.status(400).json({ message: "Invalid property ID format" });
//     }
    
//     console.error("Get property error:", err);
//     res.status(500).json({ message: "Error fetching property" });
//   }
// };
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property", error: err.message });
  }
};

// exports.updateProperty = async (req, res) => {
//   try {
//     if (!req.user?.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Only update properties owned by the authenticated user
//     const property = await Property.findOneAndUpdate(
//       { 
//         _id: req.params.id, 
//         ownerId: req.user.id 
//       },
//       req.body,
//       { 
//         new: true,
//         runValidators: true // Ensures schema validations run on update
//       }
//     );

//     if (!property) {
//       return res.status(404).json({ message: "Property not found or access denied" });
//     }

//     res.json(property);
//   } catch (err) {
//     if (err.name === 'CastError') {
//       return res.status(400).json({ message: "Invalid property ID format" });
//     }
    
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({ 
//         message: "Validation error", 
//         errors: err.errors 
//       });
//     }
    
//     console.error("Update property error:", err);
//     res.status(500).json({ message: "Error updating property" });
//   }
// };

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
