const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  workspaceName: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  smokingAllowed: { type: Boolean, default: false },
  availabilityDate: { type: Date },
  leaseTerm: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Workspace = mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
