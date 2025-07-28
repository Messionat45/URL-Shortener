const urlModel = require("../../models/urlModel");
const beUrl = process.env.BE_URL || process.env.LOCAL_BE_URL;
const url_input = async (req, res) => {
  try {
    const url = req.body.url;
    console.log(url);
    if (url) {
      const dbdata = await urlModel.findOne({ longurl: url });
      if (dbdata) {
        console.log(dbdata.shorturl);
        return res
          .status(200)
          .json({ message: "alredy exist short url", url: dbdata.shorturl });
      } else if (!dbdata) {
        const { nanoid } = await import("nanoid");
        const shortID = nanoid(4);
        const baseURL = `${beUrl}/s/`;
        const shortURL = baseURL + shortID;

        console.log("original url: ", url);
        console.log("shorten url: ", shortURL);

        const userId = req.loggedUser.userId;
        await urlModel.create({
          longurl: url,
          shorturl: shortID,
          userID: userId,
        });

        return res.status(200).json({ URLLONG: shortURL });
      }
    } else return res.status(400).json({ error: "url field cannot be empty" });
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
