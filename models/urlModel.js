const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longurl: {
    type: String,
    require: true,
  },
  shorturl: {
    type: string,
  },
});

const url = mongoose.model("url", urlSchema);
module.exports = url;
