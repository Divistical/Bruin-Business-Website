const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  position: String,
  team: { type: String, enum: ['executives', 'managers', 'interns'], required: true },
  image: String,
  linkedin: String,
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;