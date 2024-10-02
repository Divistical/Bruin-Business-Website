const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const authRoutes = require("./auth");
const Slide = require("./models/Slide");
const Member = require("./models/Member");
const Project = require("./models/Project")

const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true,
  })
);
// for storing jwts in cookies
app.use(cookieParser());

app.use("/api", authRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post("/api/slides", upload.single("image"), async (req, res) => {
  console.log("Received request to add slide", req.body, req.file);
  try {
    const linkUrl = req.body.linkUrl || "";
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const imageUrl = req.file.buffer.toString("base64");

    const newSlide = new Slide({ imageUrl, linkUrl });
    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    console.error("Error saving slide:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/slides", async (req, res) => {
  try {
    const slides = await Slide.find({});
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/slides/:id", async (req, res) => {
  try {
    const result = await Slide.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/members", upload.single("image"), async (req, res) => {
  try {
    let image = "";
    if (req.file) {
      image = req.file.buffer.toString("base64");
    }

    const { name, position, team, linkedin } = req.body;
    console.log(name, position);
    const newMember = new Member({ name, position, team, image, linkedin });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/members/:id", async (req, res) => {
  try {
    const result = await Member.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/members/:id", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/projects", upload.single("image"), async (req, res) => {
  try {
    let image = "";
    if (req.file) {
      image = req.file.buffer.toString("base64");
    }

    const { status, name, startYear, endYear, description } = req.body;
    const newProject = new Project({ status, image, name, startYear, endYear, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  console.log("no work");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => console.log("Server running on port 5000"));
