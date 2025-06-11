const express = require("express");
const router = express.Router();
const { url_input, url_search } = require("../controller/urlController");

router.post("/url", url_input);
router.get("/s/:shortID", url_search);

module.exports = router;
