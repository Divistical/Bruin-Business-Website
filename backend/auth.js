const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/User"); 

const bcrypt = require('bcrypt');

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 1;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // hash the password to store it securely
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // make new document for the user and save
    const user = new User({ username, hashedPassword, isAdmin:true });
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

    // Compare the plain password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Invalid credentials");

    // if successful, generate a token and send it to the client
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
