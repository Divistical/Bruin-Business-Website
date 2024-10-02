const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  status: { type: String, required: true },
  image: { type: String, required: false },
  name: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  description: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
