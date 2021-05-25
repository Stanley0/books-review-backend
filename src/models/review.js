const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: { type: String },
  rate: { type: Number },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true, },
  userNickname: { type: String, required: true, },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
}, { timestamps: true });


module.exports = mongoose.model("Review", reviewSchema);
