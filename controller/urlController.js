const url_input = async (req, res) => {
  try {
    const url = req.body.url;
    if (url) {
    }
  } catch (error) {
    return res.status(400).json({ error: "url field cannot be empty" });
  }
};
