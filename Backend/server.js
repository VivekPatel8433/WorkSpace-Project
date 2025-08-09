const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const loginFilePath = path.join(__dirname, "data", "login.json");
const publicPath = path.join(__dirname, "..", "Frontend");
const bookingsPath = path.join(__dirname, "data", "bookings.json");

app.use(express.static(publicPath));

app.use("/file", express.static(path.join(__dirname, "..", "file")));

const propertiesPath = path.join(__dirname, "data", "properties.json");
const workspacesPath = path.join(__dirname, "data", "workspaces.json");

// Hashing password 

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  fs.readFile(loginFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    const users = JSON.parse(data);

    // Hash the incoming password before checking
    const hashedPassword = hashPassword(password);

    // Find user matching email and hashed password
    const user = users.find(
      (u) => u.email === email && u.password === hashedPassword
    );

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});


// Register Route
app.post("/register", (req, res) => {
  const { email, password, role, firstName, lastName, phoneNumber } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Please provide email, password, and role" });
  }

  fs.readFile(loginFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    const users = JSON.parse(data);

    if (users.some((u) => u.email === email)) {
      return res.status(409).json({ message: "User already exists" });
    }

     const hashedPassword = hashPassword(password);
    const newUser = {
      email,
      password: hashedPassword,
      role,
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: phoneNumber || "",
    };
    users.push(newUser);

    fs.writeFile(loginFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Could not save user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Helper functions to read and write JSON files
function readData(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    return [];
  }
}

function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
}

// ---------- Properties Routes ----------

// Get all properties
app.get("/api/properties", (req, res) => {
  try {
    const properties = readData(propertiesPath);
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get property by id
app.get("/api/properties/:id", (req, res) => {
  const id = +req.params.id;
  const properties = readData(propertiesPath);
  const property = properties.find((p) => p.id === id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
});

// Add new property
app.post("/api/properties", (req, res) => {
  try {
    const properties = readData(propertiesPath);
    const newProp = { id: Date.now(), ...req.body };
    properties.push(newProp);
    writeData(propertiesPath, properties);
    res.status(201).json(newProp);
  } catch (error) {
    res.status(500).json({ message: "Could not save property" });
  }
});

// Update property by id
app.put("/api/properties/:id", (req, res) => {
  const id = +req.params.id;
  try {
    const properties = readData(propertiesPath);
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Property not found" });
    }
    properties[index] = { id, ...req.body };
    writeData(propertiesPath, properties);
    res.json(properties[index]);
  } catch (error) {
    res.status(500).json({ message: "Could not update property" });
  }
});

// Delete property by id
app.delete("/api/properties/:id", (req, res) => {
  const id = +req.params.id;
  try {
    let properties = readData(propertiesPath);
    const newProperties = properties.filter((p) => p.id !== id);
    if (newProperties.length === properties.length) {
      return res.status(404).json({ message: "Property not found" });
    }
    writeData(propertiesPath, newProperties);
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete property" });
  }
});

// ---------- Workspaces Routes ----------

// Get all workspaces
app.get("/api/workspaces", (req, res) => {
  const workspaces = readData(workspacesPath);
  res.json(workspaces);
});

// Get workspace by id
app.get("/api/workspaces/:id", (req, res) => {
  const id = +req.params.id;
  const workspaces = readData(workspacesPath);
  const workspace = workspaces.find((w) => w.id === id);
  if (workspace) {
    res.json(workspace);
  } else {
    res.status(404).json({ message: "Workspace not found" });
  }
});

// Add new workspace
app.post("/api/workspaces", (req, res) => {
  try {
    const workspaces = readData(workspacesPath);
    const newWS = { id: Date.now(), ...req.body };
    workspaces.push(newWS);
    writeData(workspacesPath, workspaces);
    res.status(201).json(newWS);
  } catch (error) {
    res.status(500).json({ message: "Could not save workspace" });
  }
});

// Update workspace by id
app.put("/api/workspaces/:id", (req, res) => {
  const id = +req.params.id;
  try {
    const workspaces = readData(workspacesPath);
    const index = workspaces.findIndex((w) => w.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    workspaces[index] = { id, ...req.body };
    writeData(workspacesPath, workspaces);
    res.json(workspaces[index]);
  } catch (error) {
    res.status(500).json({ message: "Could not update workspace" });
  }
});

// Delete workspace by id
app.delete("/api/workspaces/:id", (req, res) => {
  const id = +req.params.id;
  try {
    let workspaces = readData(workspacesPath);
    const newWorkspaces = workspaces.filter((w) => w.id !== id);
    if (newWorkspaces.length === workspaces.length) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    writeData(workspacesPath, newWorkspaces);
    res.json({ message: "Workspace deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete workspace" });
  }
});

/* Bookings */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/book", (req, res) => {
  try {
    const bookings = readData(bookingsPath);
    const newBooking = {
      id: Date.now(),
      workspaceId: req.body.workspaceId,
      date: req.body.date,
      userEmail: req.body.userEmail, // store user email to know who booked
    };
    bookings.push(newBooking);
    writeData(bookingsPath, bookings);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Could not save booking" });
  }
});

app.get("/api/bookings", (req, res) => {
  try {
    const bookings = readData(bookingsPath);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Could not load bookings" });
  }
});
