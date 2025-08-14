const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register Route
exports.register = async (req, res) => {
  const { email, password, role, firstName, lastName, phoneNumber } = req.body;

  // Check required fields
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please provide email, password, and role" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }
    catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
}
}