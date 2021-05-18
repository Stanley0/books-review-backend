const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userNickname: {type: String},
  UserId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  review: {type: String},
  rate: {type: Number}

});


module.exports = mongoose.model("Review", reviewSchema);
