const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/User"); 

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;


router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password, isAdmin:true });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = password == user.password
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
    
  } catch (err) {
    console.log(err)
    res.status(500).send("Error logging in");
  }
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

module.exports = router; 
