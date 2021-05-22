const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: { type: String },
  rate: { type: String }
}, { timestamps: true });


module.exports = mongoose.model("Review", reviewSchema);


// const reviewSchema = mongoose.Schema({
//   userNickname: { type: String },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   content: { type: String },
//   rate: { type: Number }
// }, { timestamps: true });
