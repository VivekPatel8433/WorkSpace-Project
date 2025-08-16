const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  neighborhood: { type: String, required: true },
  sqft: { type: Number, required: true },
  parking: { type: Boolean, default: false },
  publicTransport: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

module.exports = Property;
