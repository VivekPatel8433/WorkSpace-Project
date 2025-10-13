require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyroutes");
const workspaceRoutes = require("./routes/workspaceroutes");
const bookings = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://vivekpatel8433.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Parse JSON bodies 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/bookings", bookings);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
