const { Binary } = require("bson");
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String,  },
  category: { type: String, required: true },
  image: { Data: Binary, required: true  },
  author: { type: String, required: true },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review", }
});



module.exports = mongoose.model("Book", bookSchema);
