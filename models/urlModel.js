const mongoose = require("mongoose");
const userModel = require("./userModel.js");

const urlSchema = new mongoose.Schema({
  longurl: {
    type: String,
    require: true,
    unique: true,
  },
  shorturl: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const url = mongoose.model("url", urlSchema);
module.exports = url;
