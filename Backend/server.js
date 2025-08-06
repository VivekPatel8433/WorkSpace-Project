const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const loginFilePath = path.join(__dirname, 'data', 'login.json');

const publicPath = path.join(__dirname, '..', 'Frontend');
app.use(express.static(publicPath));

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

   app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});