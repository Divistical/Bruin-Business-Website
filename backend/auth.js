const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const bcrypt = require("bcrypt");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 1;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // hash the password to store it securely
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // make new document for the user and save
    const user = new User({ username, hashedPassword, isAdmin: true });
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
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) return res.status(400).send("Invalid credentials");

    // if successful, generate a token and send it to the client
    const token = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });

    console.log(token)
    res.cookie("token", token, {
       // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS only in production
      sameSite: "strict", // Helps prevent CSRF attacks
      maxAge: 3600000, // Cookie expires in 1 hour (in milliseconds)
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    //console.log(err);
    res.status(500).send("Error logging in");
  }
});

router.post('/signout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).send('Signed out');
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Read the JWT from the cookie

  console.log("Token:", token);

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

router.post("/checkCookie", authenticateToken, (req, res) => {
  res.send("Cookie is valid");
});

module.exports = router;
