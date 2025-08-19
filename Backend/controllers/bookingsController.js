const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { workspaceId, userEmail, date } = req.body;
    const newBooking = new Booking({ workspaceId, userEmail, date });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
