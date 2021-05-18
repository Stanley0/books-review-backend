const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userNickname: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  review: { type: String },
  rate: { type: Number }
}, { timestamps: true });


module.exports = mongoose.model("Review", reviewSchema);
