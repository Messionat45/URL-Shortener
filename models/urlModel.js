const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longurl: {
    type: String,
    require: true,
  },
  shorturl: {
    type: String,
  },
});

const url = mongoose.model("url", urlSchema);
module.exports = url;
