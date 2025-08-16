require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyroutes"); 
const workspaceRoutes = require("./routes/workspaceroutes");


const app = express();
const PORT = process.env.PORT || 3001;

// Connect to DB
connectDB();

app.use(cors({
  origin: "https://vivekpatel8433.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Login Route







// // ---------- Properties Routes ----------

// // Get all properties
// app.get("/api/properties", (req, res) => {
//   try {
//     const properties = readData(propertiesPath);
//     res.json(properties);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Get property by id
// app.get("/api/properties/:id", (req, res) => {
//   const id = +req.params.id;
//   const properties = readData(propertiesPath);
//   const property = properties.find((p) => p.id === id);
//   if (property) {
//     res.json(property);
//   } else {
//     res.status(404).json({ message: "Property not found" });
//   }
// });

// // Add new property
// app.post("/api/properties", (req, res) => {
//   try {
//     const properties = readData(propertiesPath);
//     const newProp = { id: Date.now(), ...req.body };
//     properties.push(newProp);
//     writeData(propertiesPath, properties);
//     res.status(201).json(newProp);
//   } catch (error) {
//     res.status(500).json({ message: "Could not save property" });
//   }
// });

// // Update property by id
// app.put("/api/properties/:id", (req, res) => {
//   const id = +req.params.id;
//   try {
//     const properties = readData(propertiesPath);
//     const index = properties.findIndex((p) => p.id === id);
//     if (index === -1) {
//       return res.status(404).json({ message: "Property not found" });
//     }
//     properties[index] = { id, ...req.body };
//     writeData(propertiesPath, properties);
//     res.json(properties[index]);
//   } catch (error) {
//     res.status(500).json({ message: "Could not update property" });
//   }
// });

// // Delete property by id
// app.delete("/api/properties/:id", (req, res) => {
//   const id = +req.params.id;
//   try {
//     let properties = readData(propertiesPath);
//     const newProperties = properties.filter((p) => p.id !== id);
//     if (newProperties.length === properties.length) {
//       return res.status(404).json({ message: "Property not found" });
//     }
//     writeData(propertiesPath, newProperties);
//     res.json({ message: "Property deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Could not delete property" });
//   }
// });

// // ---------- Workspaces Routes ----------

// // Get all workspaces
// app.get("/api/workspaces", (req, res) => {
//   const workspaces = readData(workspacesPath);
//   res.json(workspaces);
// });

// // Get workspace by id
// app.get("/api/workspaces/:id", (req, res) => {
//   const id = +req.params.id;
//   const workspaces = readData(workspacesPath);
//   const workspace = workspaces.find((w) => w.id === id);
//   if (workspace) {
//     res.json(workspace);
//   } else {
//     res.status(404).json({ message: "Workspace not found" });
//   }
// });

// // Add new workspace
// app.post("/api/workspaces", (req, res) => {
//   try {
//     const workspaces = readData(workspacesPath);
//     const newWS = { id: Date.now(), ...req.body };
//     workspaces.push(newWS);
//     writeData(workspacesPath, workspaces);
//     res.status(201).json(newWS);
//   } catch (error) {
//     res.status(500).json({ message: "Could not save workspace" });
//   }
// });

// // Update workspace by id
// app.put("/api/workspaces/:id", (req, res) => {
//   const id = +req.params.id;
//   try {
//     const workspaces = readData(workspacesPath);
//     const index = workspaces.findIndex((w) => w.id === id);
//     if (index === -1) {
//       return res.status(404).json({ message: "Workspace not found" });
//     }
//     workspaces[index] = { id, ...req.body };
//     writeData(workspacesPath, workspaces);
//     res.json(workspaces[index]);
//   } catch (error) {
//     res.status(500).json({ message: "Could not update workspace" });
//   }
// });

// // Delete workspace by id
// app.delete("/api/workspaces/:id", (req, res) => {
//   const id = +req.params.id;
//   try {
//     let workspaces = readData(workspacesPath);
//     const newWorkspaces = workspaces.filter((w) => w.id !== id);
//     if (newWorkspaces.length === workspaces.length) {
//       return res.status(404).json({ message: "Workspace not found" });
//     }
//     writeData(workspacesPath, newWorkspaces);
//     res.json({ message: "Workspace deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Could not delete workspace" });
//   }
// });

// /* Bookings */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.post("/api/book", (req, res) => {
//   try {
//     const bookings = readData(bookingsPath);
//     const newBooking = {
//       id: Date.now(),
//       workspaceId: req.body.workspaceId,
//       date: req.body.date,
//       userEmail: req.body.userEmail, // store user email to know who booked
//     };
//     bookings.push(newBooking);
//     writeData(bookingsPath, bookings);
//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error("Booking error:", error);
//     res.status(500).json({ message: "Could not save booking" });
//   }
// });

// app.get("/api/bookings", (req, res) => {
//   try {
//     const bookings = readData(bookingsPath);
//     res.json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Could not load bookings" });
//   }
// });
