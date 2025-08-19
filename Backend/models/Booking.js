const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  workspaceId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
