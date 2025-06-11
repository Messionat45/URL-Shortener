const mongoose = require("mongoose");

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
});

const url = mongoose.model("url", urlSchema);
module.exports = url;
