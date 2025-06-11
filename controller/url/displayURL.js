const urlModel = require("../../models/urlModel");

const display = async (req, res) => {
  try {
    const jwtUser = req.loggedUser;
    console.log("display jwt", jwtUser);
    const userLinks = await urlModel.find({ userID: jwtUser.userId });

    userLinks.forEach((link) =>
      console.log("short URL:", link.shorturl, "Long URL:  ", link.longurl)
    );

    return res.status(200).json(userLinks);
  } catch (error) {
    return res.status(500).json({ message: "some server isusue" });
  }
};

module.exports = display;
