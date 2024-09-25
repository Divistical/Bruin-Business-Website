const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
