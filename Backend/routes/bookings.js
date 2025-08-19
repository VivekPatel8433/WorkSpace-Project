const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
} = require("../controllers/bookingsController");

// POST /api/bookings
router.post("/", createBooking);

// GET /api/bookings
router.get("/", getBookings);

module.exports = router;
