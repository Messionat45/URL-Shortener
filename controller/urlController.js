const urlModel = require("../models/urlModel");

const url_input = async (req, res) => {
  try {
    const url = req.body.url;
    if (url) {
      console.log(url);
      return res.status(200).json({ URLLONG: url });
    } else return res.status(400).json({ error: "url field cannot be empty" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server issue" });
  }
};

module.exports = { url_input };
