const urlModel = require("../../models/urlModel");
const beUrl = process.env.BE_URL || process.env.LOCAL_BE_URL;

const url_input = async (req, res) => {
  try {
    const url = req.body.url;
    let shorturl;

    if (url) {
      const dbdata = await urlModel.findOne({
        userID: req.loggedUser.userId,
        longurl: url,
      });
      if (dbdata) {
        const baseURL = `${beUrl}/s/`;
        shorturl = baseURL + dbdata.shorturl;
      } else if (!dbdata) {
        const { nanoid } = await import("nanoid");
        const shortID = nanoid(4);
        const baseURL = `${beUrl}/s/`;
        shorturl = baseURL + shortID;

        console.log("original url: ", url);
        console.log("shorten url: ", shorturl);

        const userId = req.loggedUser.userId;
        await urlModel.create({
          longurl: url,
          shorturl: shortID,
          userID: userId,
        });
      }
      return res.status(200).json({ shorturl: shorturl });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server issue" });
  }
};

const url_search = async (req, res) => {
  try {
    const sid = req.params.shortID;
    console.log(sid);

    const urlhit = await urlModel.findOne({ shorturl: sid });
    console.log(urlhit);

    if (urlhit) {
      return res.redirect(urlhit.longurl);
    } else return res.status(400).send("url not fund");
  } catch (error) {
    return res.status(500).send("server issue");
  }
};

module.exports = { url_input, url_search };
