const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  isAdmin: { type: Boolean}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;