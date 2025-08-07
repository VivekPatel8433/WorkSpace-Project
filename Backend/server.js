
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");


// Async read


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const loginFilePath = path.join(__dirname, 'data', 'login.json');


const publicPath = path.join(__dirname, '..', 'Frontend');
app.use(express.static(publicPath));

app.use("/file", express.static(path.join(__dirname, "..", "file")));

const propertiesPath = path.join(__dirname, "data", "properties.json");
const workspacesPath = path.join(__dirname, "data", "workspaces.json");


// Login Route
app.post('/login', (req,res) => { 
    const { email, password } = req.body;

    fs.readFile(loginFilePath, "utf-8", (err, data) => {
        if(err) {
            return res.status(500).json({message: "Server error"})
        }
       
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email && u.password === password); // Check if match

     if(user) {
        res.json(user);
     } else {
        res.status(401).json({ message: "Invalid credentials" });
     }
    });
});

    // Register Route

    app.post('/register', (req, res) => {
        const { email, password, role, firstName, lastName, phoneNumber} = req.body;

    if (!email || !password || !role) {
    return res.status(400).json({ message: "Please provide email, password, and role" });
  }

    fs.readFile(loginFilePath, "utf-8", (err, data) => {
        if(err) {
            return res.status(500).json({ message: "Server error" });
        }
        const users = JSON.parse(data);

        // Checks if user exists

        if (users.some(u => u.email === email)) {
        return res.status(409).json({ message: "User already exists" });
     }

        // Add new user

        const newUser = {
            email,
            password,
            role,
            firstName: firstName || "",
            lastName: lastName || "",
            phoneNumber: phoneNumber || ""
        };
        users.push(newUser);

        // Updated array back to file

        fs.writeFile(loginFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Could not save user" });
        } 
         res.status(201).json({ message: "User registered successfully" });
        });
      });
    });

// Properties route

// Read data from file

// Helper: Read JSON from file
function readData(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data || "[]");
}

// Helper: Write JSON to file
function writeData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ROUTES

// Get all properties
app.get("/api/properties", (req, res) => {
  const properties = readData(propertiesPath);
  res.json(properties);
});

// Add new property
app.post("/api/properties", (req, res) => {
  const properties = readData(propertiesPath);
  const newProp = { id: Date.now(), ...req.body };
  properties.push(newProp);
  writeData(propertiesPath, properties);
  res.status(201).json(newProp);
});

// Get all workspaces
app.get("/api/workspaces", (req, res) => {
  const workspaces = readData(workspacesPath);
  res.json(workspaces);
});

// Add new workspace
app.post("/api/workspaces", (req, res) => {
  const workspaces = readData(workspacesPath);
  const newWS = { id: Date.now(), ...req.body };
  workspaces.push(newWS);
  writeData(workspacesPath, workspaces);
  res.status(201).json(newWS);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});