const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: Array, required: true },
  author: { type: String, required: true },
  description: { type: String },
  image: { type: { buffer: Buffer, mimetype: String }, required: false },
  rate: { type: Number},
  // review: { type: mongoose.Schema.Types.ObjectId, ref: "Review", }
}, { timestamps: true });








module.exports = mongoose.model("Book", bookSchema);
